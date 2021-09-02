const Tag = require('../Tag')
const {findTagClass} = require('../utils')

class Blockquote extends Tag {
    constructor(str, tagName = 'blockquote', options) {
        super(str, tagName,options)
        this.match = this.match || '>'
        this.fillPerLine = this.fillPerLine.bind(this)
    }


    beforeMergeSpace(content) {
        if(content.trim()==='')return ''
        let matchStr=this.match + ' ' + content
        if(this.calcLeading){
            return this.leadingSpace + matchStr
        }
        return matchStr
    }

    afterMergeSpace(content) {
        let split = content.split('\n')
        split = split.map(n => {
            if (n === '') return ''
            return this.fillPerLine(n)
        })
        console.log(content,split)
        return split.join('\n')
    }

    fillPerLine(lineStr) {
        let startWith='>'
        if(this.calcLeading){
            startWith = this.leadingSpace+'>'
        }
        if (!lineStr.startsWith(startWith)){
            let matchStr=this.match + ' ' + lineStr
            if(this.calcLeading){
                return this.leadingSpace + matchStr
            }
            return matchStr
        }
        return lineStr
    }

    parseValidSubTag(subTagStr, subTagName,options) {
        let subTag
        if(subTagName==='blockquote'){
            let SubTagClass = findTagClass(subTagName)
            subTag = new SubTagClass(subTagStr, subTagName, {
                ...options,
                calcLeading:this.calcLeading,
                match: this.match + '>'
            })
        }else{
            let SubTagClass = findTagClass(subTagName)
            subTag = new SubTagClass(subTagStr, subTagName, {
                ...options,
            })
        }
        let str=subTag.exec('', '\n')

        let leadingSpace=''
        if(this.calcLeading){
            leadingSpace=this.leadingSpace
        }

        if(this.isFirstTag){
            return str.trimLeft().replace(leadingSpace,'')
        }else{
            return leadingSpace+this.match + '\n' + str
        }
    }


    exec(prevGap = '\n', endGap = '\n') {
        return super.exec(prevGap, endGap)
    }

}

module.exports = Blockquote


