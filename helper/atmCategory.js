
const category=(atmIds,result)=>{
    const hardware_categories=[]
    const cashout_categories=[]
    const inservice_categories=[]

    const visited=new Set()

    for(var i=0;i<atmIds.length;i++){
        let fit=result[atmIds[i]].fitness_array
        let sen=result[atmIds[i]].sensor_array
        let sup=result[atmIds[i]].supply_array
        
    
          // categorizing each atms into their categories
        if((fit.includes('1')||fit.includes('3')||fit.includes('4'))||(sen.includes('2'))){
            hardware_categories.push(atmIds[i])
            visited.add(atmIds[i])
        }
    
        if(!(visited.has(atmIds[i]))){
         
            if(sup.includes('3')||sup.includes('4')) {
                cashout_categories.push(atmIds[i])
                visited.add(atmIds[i])
            }
        }
        if(!((visited.has(atmIds[i]))||(visited.has(atmIds[i])))){
            inservice_categories.push(atmIds[i])
        }
    }
    return {hardware_categories,cashout_categories,inservice_categories}
}
module.exports=category