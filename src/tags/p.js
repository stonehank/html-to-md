const Tag = require('../Tag')


class P extends Tag {
    constructor(str, tagName = 'p', options) {
        super(str, tagName,options)
        this.options=options
    }

    beforeMergeSpace(content) {
        if(this.calcLeading){
            return this.leadingSpace + content
        }
        return content
    }


    exec(prevGap = '\n', endGap = '\n') {
        // console.log(this.options)
        if(
            (!this.prevTagName && !!this.prevTagStr)
            && !this.prevTagStr.endsWith('\n')
        ){
            prevGap='\n\n'
        }
        if(
            (!this.nextTagName && !!this.nextTagStr)
            && !this.nextTagStr.startsWith('\n')
        ){
            endGap='\n\n'
        }
        // console.log(JSON.stringify(prevGap),JSON.stringify(endGap))
        return super.exec(prevGap, endGap)
    }

}


module.exports = P
