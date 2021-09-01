const {findValidTag, findTagClass, parseAttrs} = require('./utils')
const RawString = require('./tags/__rawString__')
const {TAB_SPACE} = require('./utils/CONSTANT')


class Tag {
    constructor(str, tagName, {
        tabSpace = TAB_SPACE,
        parentTag = '',
        strKeepFormat=false,
        layer=1,
        isFirstTag=false
    } = {}) {
        this.tagName = tagName
        this.rawStr = str
        this.parentTag = parentTag
        this.strKeepFormat=strKeepFormat || parentTag==='code' || parentTag==='pre'
        this.needEscape = false
        this.isFirstTag = isFirstTag
        this.tabSpace = tabSpace
        this.layer = layer
        this.leadingSpace=this.tabSpace.repeat(this.layer-1)
        if (!this.__detectStr__(str, this.tagName)) {
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


    // 在步骤开始前，一般只需返回空字符串
    beforeParse() {
        return ''
    }

    // 存在tagName时，解析步骤
    parseValidSubTag(subTagStr, subTagName) {
        let SubTagClass = findTagClass(subTagName)
        let subTag = new SubTagClass(subTagStr, subTagName, {
            parentTag: this.tagName,
            strKeepFormat: this.strKeepFormat
        })
        return subTag.exec()
    }

    // 不存在tagName时，解析步骤
    parseOnlyString(subTagStr, subTagName,options) {
        let rawString = new RawString(subTagStr, subTagName, {
            parentTag: this.tagName,
            hasNext:options.hasNext,
            strKeepFormat: this.strKeepFormat || options.strKeepFormat,
            nextTagName:options.nextTagName,
            prevTagName:options.prevTagName,
            hasPrev:options.hasPrev,
            layer:options.layer || 1,
        })
        return rawString.exec()
    }


    // 在解析完毕后，此时还并未去除不必要的空行
    afterParsed(content) {
        return content
    }

    // 去除不必要的空行
    slim(content) {
        if(this.strKeepFormat)return content
        // console.log(content,this.layer)
        // if(this.layer>1){
        //     return content.replace(/^\n+/g,'').trimRight()
        // }
        return content.trim()
        // return content.replace(/^ +/g,'').replace(/ +$/g,'')
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
            if (nextTagName != null) {
                content += this.parseValidSubTag(nextTagStr, nextTagName)
            } else {
                content += this.parseOnlyString(nextTagStr, nextTagName, {
                    nextTagName:afterNextTagName,
                    prevTagName,
                    strKeepFormat:this.strKeepFormat,
                    layer:this.layer + 1
                })
            }
            prevTagName=nextTagName
            nextTagName=afterNextTagName
            nextTagStr=afterNextTagStr
        }
        // console.log(content)
        content = this.afterParsed(content)
        content = this.slim(content)
        if(content.trim()==='')return ''
        content = this.beforeMergeSpace(content)
        content = prevGap + content + endGap
        content = this.afterMergeSpace(content)
        content = this.beforeReturn(content)
        return content
    }
}


module.exports = Tag
