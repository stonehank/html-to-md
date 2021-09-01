const Tag = require('../Tag')
const {findTagClass} = require('../utils')

class Blockquote extends Tag {
    constructor(str, tagName = 'blockquote', {matchCounts = 1, layer = 1} = {}) {
        super(str, tagName)
        this.matchCounts = matchCounts
        this.layer = layer
        this.leadingSpace = this.tabSpace.repeat(this.layer - 1)
        this.match = '>'.repeat(this.matchCounts)
        this._isFirstSubTag = true
        this.fillPerLine = this.fillPerLine.bind(this)
    }


    beforeMergeSpace(content) {
        if(content.trim()==='')return ''
        return this.match + ' ' + content
    }

    afterMergeSpace(content) {
        let split = content.split('\n')
        split = split.map(n => {
            if (n === '') return ''
            return this.fillPerLine(n)
        })
        return split.join('\n')
    }

    fillPerLine(lineStr) {
        if (!lineStr.startsWith('>') && this.matchCounts)
            return this.leadingSpace + this.match + ' ' + lineStr
        return this.leadingSpace + lineStr
    }

    parseValidSubTag(subTagStr, subTagName) {
        let SubTagClass = findTagClass(subTagName)
        let isSubIsBlockquote = subTagName === 'blockquote'
        let subTag = new SubTagClass(subTagStr, subTagName, isSubIsBlockquote ? {matchCounts: this.matchCounts + 1} : {})
        if (!this._isFirstSubTag) {
            return this.match + '\n' + subTag.exec('', '\n')
        } else {
            this._isFirstSubTag = false
            return subTag.exec('', '\n')
        }
    }


    exec(prevGap = '\n', endGap = '\n') {
        // if (this.layer > 1) {
        //     prevGap = ''
        // }
        return super.exec(prevGap, endGap)
    }

}

module.exports = Blockquote


