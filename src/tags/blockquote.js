const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')

class Blockquote extends Tag{
  constructor(str,tagName='blockquote',{layer}={layer:1}){
    super(str,tagName)
    this.layer=layer
    this.fillPreMatch=this.fillPreMatch.bind(this)
  }

  fillPreMatch(lineStr){
    // console.log(this.layer)
    if(lineStr.startsWith('>'))return lineStr
    if(this.layer)return '>'.repeat(this.layer)+lineStr
    return lineStr
  }

  // beforeMerge(){
  //   if(this.layer)return '>'.repeat(this.layer)
  //   return ''
  // }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()

    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let isSubblockq=tagName==='blockquote'
        let subTag=new SubTagClass(tagStr,tagName,isSubblockq ? {layer:this.layer+1} : {})
        res+=subTag.execMerge('','\n')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }

    let split=res.split('\n')
    // console.log(split,this.filter)
    split=split.map(n=>{
      if(n==='')return ''
      return this.fillPreMatch(n)
    })
    return split.join('\n')

  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Blockquote


let b=new Blockquote("<blockquote>\n" +
  '<ol>' +
  '<li>123</li>' +
  '<li>234</li>' +
  '<li>345' +
  '<ol>' +
  '<li>123</li>' +
  '<li>234</li>' +
  '<li>345' +
  '<ol>' +
  '<li>123</li>' +
  '<li>234</li>' +
  '<li>345' +
  '<ol>' +
  '<li>123</li>' +
  '<li>234</li>' +
  '<li>345' +
  '<ol>' +
  '<li>123</li>' +
  '<li>234</li>' +
  '<li>345</li>' +
  '</ol>' +
  '</li>' +
  '</ol>' +
  '</li>' +
  '</ol>' +
  '</li>' +
  '</ol>' +
  '</li>' +
  '</ol>' +
  "</blockquote>\n"
)
//  b=new Blockquote("<blockquote>\n" +
//   "<p>Blockquotes can &lt;button&gt;&lt;/button&gt; be nested…</p>\n" +
//   "<blockquote>\n" +
//   "<p>…by using additional greater-than signs right next to each other…</p>\n" +
//   "<blockquote>\n" +
//   "<p>…or with spaces between arrows1.</p>\n" +
//   "<blockquote>\n" +
//   "<p>…or with spaces between arrows2.</p>\n" +
//   "<blockquote>\n" +
//   "<p>…or with spaces between arrows3.</p>\n" +
//   "</blockquote>\n" +
//   "</blockquote>\n" +
//   "</blockquote>\n" +
//   "</blockquote>\n" +
//   "</blockquote>\n"
// )

console.log(b.execMerge())

