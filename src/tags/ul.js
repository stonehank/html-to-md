const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')

class Ul extends Tag{
  constructor(str,tagName='ul',{layer=1}={}){
    super(str,tagName)
    this.layer=layer
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=='li'){
        throw new Error('should not have tags except <li> inside ul, current tag is '+tagName)
      }
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:'*',layer:this.layer})
        res+=subTag.execMerge('','\n')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Ul

//
// let ul=new Ul('<ul>' +
//   '<li>123</li>' +
//   '<li>234</li>' +
//   '<li>345' +
//       '<ul>' +
//       '<li>123</li>' +
//       '<li>234</li>' +
//       '<li>345' +
//           '<ul>' +
//           '<li>123</li>' +
//           '<li>234</li>' +
//           '<li>345' +
//               '<ul>' +
//               '<li>123</li>' +
//               '<li>234</li>' +
//               '<li>345' +
//               '<ul>' +
//               '<li>123</li>' +
//               '<li>234</li>' +
//               '<li>345</li>' +
//               '</ul>' +
//               '</li>' +
//               '</ul>' +
//           '</li>' +
//           '</ul>' +
//       '</li>' +
//       '</ul>' +
//   '</li>' +
//   '</ul>')
//
// console.log(ul.execMerge())