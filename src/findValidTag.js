const isSelfCloseTag=require("./isSelfCloseTag")

function getTagName(str,id){
  let name=''
  while(/[a-z]/.test(str[id])){
    name+=str[id++]
  }
  return name
}

function findValidTag(str){
  let startId=0
  // console.log(str)
  return ()=>{
    let res=''
    let tagName=null,count=0,tempName='',open=false,canBeBreak=false
    // console.log(startId)
    for(let i=startId;i<str.length;i++){
      if(str[i]==="<" && str[i+1]!=="/"){
        if(res!=='' && tagName==null){
          startId=i
          return [tagName,res]
        }
        open=true
        tempName=getTagName(str,i+1)
        if(tagName==null){
          tagName=tempName
        }
        if(tagName===tempName)count++
        if(isSelfCloseTag(tagName)){
          count--
          if(count===0)canBeBreak=true
        }

      }else if(str[i]==='<' && str[i+1]==="/"){
        if(tagName==null){
          throw new Error("tag is not integrity")
        }
        tempName=getTagName(str,i+2)
        if(tagName===tempName){
          count--
        }
        if(count===0)canBeBreak=true
      }
      res+=str[i]
      // if(open)res+=str[i]
      if(str[i]==='>' && canBeBreak){
        startId=i+1
        // break
        return [tagName,res]
      }
    }
    startId=str.length
    return [tagName,res]
  }
}


// let getN=findValidTag("asdfsf<p>Blockquotes can &lt;button&gt;&lt;/button&gt; be nested…</p>\n" +
//   "<blockquote>\n" +
//   "<p>…by using additional greater-than signs right next to each other…</p>\n" +
//   "<blockquote>\n" +
//   "<p>…or with spaces between arrows.</p>\n" +
//   "</blockquote>\n" +
//   "</blockquote>sdfsf")
// let getN=findValidTag("<hr /><h1>dsafsf<button>sfds</button>123</h1>")
//
//
// console.log(getN())
// console.log(getN())
// console.log(getN())
// console.log(getN())
// console.log(getN())
// console.log(getN())


module.exports=findValidTag