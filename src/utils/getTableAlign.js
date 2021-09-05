function getTableAlign(str,tableColumnCount){
    let alignObj={
        _default_:'---|',
        center:':---:|',
        left:':---|',
        right:"---:|",
        start:':---|',
        end:"---:|"
    }
    let res=Array(tableColumnCount).fill( alignObj['_default_'])
    let match=str.match(/<(td|th)(.*?)>/g)
    if(!match)return res
    res=match.slice(0,tableColumnCount)
    // console.log(res,match,str)
    res=res.map(s=>{
        let alignMatch=s.match(/align\s*=\s*['"]\s*(center|left|right|start|end)/)
        let styleMatch=s.match(/text-align\s*:\s*(center|left|right|start|end)/)
        // Style first
        if(!alignMatch && !styleMatch){
            return alignObj['_default_']
        }else if(alignMatch && !styleMatch){
            return alignObj[alignMatch[1]] || alignObj['_default_']
        }else{
            return alignObj[styleMatch[1]] || alignObj['_default_']
        }
    })

    return res
}
module.exports=getTableAlign
