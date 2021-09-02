const Tag = require('../Tag')


class P extends Tag {
    constructor(str, tagName = 'p', options) {
        super(str, tagName,options)
    }

    beforeMergeSpace(content) {
        if(this.calcLeading){
            return this.leadingSpace + content
        }
        return content
    }


    exec(prevGap = '\n', endGap = '\n') {
        return super.exec(prevGap, endGap)
    }

}


module.exports = P
