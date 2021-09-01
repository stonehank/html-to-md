const Tag = require('../Tag')


class P extends Tag {
    constructor(str, tagName = 'p', {layer = 1, isFirstTag = false} = {}) {
        super(str, tagName)
        this.layer = layer
        this.leadingSpace = isFirstTag ? '' : this.tabSpace.repeat(this.layer - 1)
    }

    beforeMergeSpace(content) {
        return this.leadingSpace + content
    }

    exec(prevGap = '\n', endGap = '\n') {
        return super.exec(prevGap, endGap)
    }

}


module.exports = P
