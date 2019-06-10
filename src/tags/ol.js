const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')

class Ol extends Tag{
  constructor(str,tagName='ol',{layer=1}={}){
    super(str,tagName)
    this.layer=layer
    this.count=1
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=='li'){
        throw new Error('should not have tags except <li> inside ol')
      }
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:this.count+'.',layer:this.layer})
        res+=subTag.execMerge('','\n')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
      this.count++
    }
    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Ol


let ol=new Ol('<ol>' +
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
  '<li>456</li>' +
  '</ol>')

console.log(ol.execMerge())