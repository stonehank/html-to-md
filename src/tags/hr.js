const SelfCloseTag =require('../SelfCloseTag')

class Hr extends SelfCloseTag{
  constructor(str,tagName='hr',options){
    super(str,tagName,options)
    console.log(this.layer,this.leadingSpace,this.tabSpace)
  }

  beforeMergeSpace(){
    return this.leadingSpace + "---"
  }

  beforeReturn(content){
    // if(this.layer>1 || this.isFirstTag){
    //   return content
    // }
    content.replace(/^(\n\s*)+/,'\n\n')
      .replace(/(\n\s*)+$/,'\n\n')
    return  content
  }


  exec(prevGap='\n',endGap='\n'){
    // if(this.layer>1 || this.isFirstTag){
    //   endGap='\n'
    // }
    console.log(JSON.stringify(prevGap+'---'+endGap))
    return super.exec(prevGap,endGap)
  }

}


module.exports=Hr
