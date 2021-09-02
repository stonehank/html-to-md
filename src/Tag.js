const {findValidTag, findTagClass, parseAttrs} = require('./utils')
const RawString = require('./tags/__rawString__')
const {SINGLE} = require('./utils/CONSTANT')
const needIndependentLine = require('./utils/needIndependentLine')
const getRealTagName = require('./utils/getRealTagName')


class Tag {
    constructor(str, tagName, {
        keepFormat=false,
        prevTagName='',
        nextTagName='',
        parentTag='',
        isFirstTag=true,
        calcLeading=false,
        leadingSpace='',
        layer=1,
        noWrap=false,
        match=null,
        intendSpace='',
        language='',
        count=1,
        tdNum=0,
    } = {}) {
        this.tagName = tagName
        this.rawStr = str
        this.parentTag = parentTag
        this.prevTagName = prevTagName
        this.nextTagName = nextTagName
        this.isFirstTag = isFirstTag
        this.calcLeading = calcLeading
        this.leadingSpace = leadingSpace
        this.layer = layer
        this.noWrap=noWrap
        this.match=match
        this.intendSpace=intendSpace
        this.language=language
        this.count=count
        this.tdNum=tdNum

        this.keepFormat=keepFormat || parentTag==='code' || parentTag==='pre'
        if (!this.__detectStr__(str, this.tagName)) {
            this.attrs={}
            this.content=''
            return
        }
        let {attr, content} = this.__fetchTagAttrAndContent__(str)
        this.attrs = attr
        this.content = content
    }

    /**
     * Detect is a valid tag string
     * @param str
     * @param tagName
     * @returns {boolean}
     */
    __detectStr__(str, tagName) {
        if (str[0] !== "<") {
            console.error(`Not a valid tag, current tag name: ${this.tagName}, tag content: ${str}`)
            return false
        }
        let name = '', name_done = false
        for (let i = 1; i < str.length; i++) {
            if (str[i] === ">") break
            if (!name_done && /(\s|\/)/.test(str[i])) {
                name_done = true
            }
            if (!name_done) {
                name += str[i]
            }
        }

        // SelfClose tag
        if (name.endsWith('/')) {
            console.warn('There detect a self close tag, which name is:', name.slice(0, -1))
            return false
        }
        if (name !== tagName) {
            console.warn("Tag is not match tagName, tagName in str is " + name + ', which tagName passed from parent is ' + tagName)
            return false
        }
        return true
    }

    /**
     *
     * @param str
     * @returns {{attr: {}, content: *}}
     */
    __fetchTagAttrAndContent__(str) {
        let openTagAttrs = '', i = 1
        for (; i < str.length; i++) {
            if (str[i] === ">") break
            openTagAttrs += str[i]
        }
        let restStr = str.slice(i + 1)
        let m = '', endId = -1
        for (let j = restStr.length - 1; j >= 0; j--) {
            m = restStr[j] + m
            if (m.startsWith('</')) {
                if (m.startsWith('</' + this.tagName + '>')) {
                    endId = j
                }
                break
            }
        }
        if (endId === -1) {
            console.warn("Tag " + this.tagName + " has no close.")
        }
        return {
            attr: parseAttrs(openTagAttrs),
            content: restStr.slice(0, endId)
        }
    }

    __onlyLeadingSpace__(str){
        str=str.trim()
        for(let i=0;i<str.length;i++){
            if(str[i]!==SINGLE)return false
        }
        return true
    }


    __isEmpty__(str){
        if(this.keepFormat)return false
        return str==='' || (this.calcLeading && this.__onlyLeadingSpace__(str))
    }

    // 在步骤开始前，一般只需返回空字符串
    beforeParse() {
        return ''
    }

    // 存在tagName时，解析步骤
    parseValidSubTag(subTagStr, subTagName,options) {
        let SubTagClass = findTagClass(subTagName)
        let subTag = new SubTagClass(subTagStr, subTagName, options)
        return subTag.exec()
    }

    // 不存在tagName时，解析步骤
    parseOnlyString(subTagStr, subTagName,options) {
        let rawString = new RawString(subTagStr, subTagName, options)
        return rawString.exec()
    }


    // 在解析完毕后，此时还并未去除不必要的空行
    afterParsed(content) {
        return content
    }

    // 去除不必要的空行
    slim(content) {
        if(this.keepFormat)return content
        return content.trim()
    }

    // 去除不必要的空行后，但在合并必要的空行前
    beforeMergeSpace(content) {

        return content
    }

    // 合并必要的空行后
    afterMergeSpace(content) {
        return content
    }

    // 最终返回前
    beforeReturn(content) {
        return content
    }


    exec(prevGap = '', endGap = '') {
        let content = this.beforeParse()
        let getNxtValidTag = findValidTag(this.content)
        let [nextTagName, nextTagStr] = getNxtValidTag()
        let prevTagName=null
        while (nextTagStr!== '') {
            let [afterNextTagName,afterNextTagStr]=getNxtValidTag()
            let options={
                parentTag:this.tagName,
                nextTagName:afterNextTagName,
                prevTagName:prevTagName,
                leadingSpace:this.leadingSpace,
                layer:this.layer,
                keepFormat:this.keepFormat,
            }
            let nextStr
            if (nextTagName != null) {
                nextStr = this.parseValidSubTag(nextTagStr, nextTagName,options)
            } else {
                nextStr = this.parseOnlyString(nextTagStr, nextTagName, options)
            }
            let _currentTagName=nextTagName
            nextTagName=afterNextTagName
            nextTagStr=afterNextTagStr
            // console.log(this.tagName,JSON.stringify(nextStr))
            if(!this.keepFormat && _currentTagName == null && this.__isEmpty__(nextStr)){
                continue
            }
            prevTagName=_currentTagName
            this.isFirstTag=false
            content+=nextStr
        }
        // console.log(content)
        content = this.afterParsed(content)
        content = this.slim(content)
        if(!this.keepFormat && this.__isEmpty__(content))return ''
        content = this.beforeMergeSpace(content)
        // 当类似<img>后面跟随<p>情况，需要<p>多空一行
        if(needIndependentLine(this.tagName)
            && !!this.prevTagName
            && !content.startsWith('\n')
            && !needIndependentLine(this.prevTagName)
        ){
            prevGap='\n\n'
        }
        content = prevGap + content + endGap
        if(this.noWrap) content=content.replace(/\s+/g,' ')
        content = this.afterMergeSpace(content)
        content = this.beforeReturn(content)
        return content
    }
}


module.exports = Tag
