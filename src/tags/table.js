const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')


class Table extends Tag{
  constructor(str,tagName='table'){
    super(str,tagName)
  }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','\n')
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
module.exports=Table


let t=new Table("<table class=\"table table-striped\">" +
  "<thead>" +
  "<tr>" +
  "<th style=\"text-align:left\">Option</th>" +
  "<th style=\"text-align:right\">Description</th>" +
  "<th style=\"text-align:center\"></th>" +
  "</tr>" +
  "</thead>" +
  "<tbody>" +
  "<tr>" +
  "<td style=\"text-align:left\">data</td>" +
  "<td style=\"text-align:right\">path to data files to supply the data that will be passed into templates.</td>" +
  "<td style=\"text-align:center\">sdfasf</td>" +
  "</tr>" +
  "<tr>" +
  "<td style=\"text-align:left\">engine</td>" +
  "<td style=\"text-align:right\">engine to be used for processing templates. Handlebars is the default.</td>" +
  "<td style=\"text-align:center\"></td>" +
  "</tr>" +
  "<tr>" +
  "<td style=\"text-align:left\">ext</td>" +
  "<td style=\"text-align:right\">extension to be used for dest files.</td>" +
  "<td style=\"text-align:center\"></td>" +
  "</tr>" +
  "</tbody>" +
  "</table>")

console.log(t.execMerge())