const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')
const checkLang=require('../checkLang')
const {unescape}=require( '../escape')

class Pre extends Tag{
  constructor(str,tagName='pre'){
    super(str,tagName)
    this.language=''
    this.handleLanguage()
  }


  handleLanguage(){
    let attrs=this.getAttrs()
    // console.log(attrs)
    let className=attrs['class']
    if(!className)return
    let classArr=className.split(' ')
    console.log(classArr)
    for(let i=classArr.length-1;i>=0;i--){
      let temp='',
        name=classArr[i]
      for(let j=name.length-1;j>=0;j--){
        console.log(temp,name[j])
        if(!/[a-zA-Z0-9]/.test(name[j])){
          let standard=checkLang(temp)
          console.log(temp,standard)
          if(standard){
            this.language=standard
            return
          }
        }
        temp=name[j]+temp
      }
    }
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="code"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:'```',language:this.language})
        res+=subTag.execMerge('','')
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Pre



let pre=new Pre("<pre class=\"hljs language-js\"><code>![](xsdf)\n" +
  "<span class=\"hljs-keyword\">var</span> foo = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">bar</span>) </span>{\n" +
  "  <span class=\"hljs-keyword\">return</span> bar++;\n" +
  "};\n" +
  "\n" +
  "<span class=\"hljs-built_in\">console</span>.log(foo(<span class=\"hljs-number\">5</span>));\n" +
  "</code></pre>")
//
console.log(pre.execMerge())