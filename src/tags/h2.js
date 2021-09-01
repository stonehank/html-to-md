const __Heading__ =require('./__Heading__')



class H2 extends __Heading__{
  constructor(str,tagName='h2'){
    super(str,tagName)
  }

  beforeMergeSpace(content){
    return "## "+ content
  }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}


module.exports=H2
