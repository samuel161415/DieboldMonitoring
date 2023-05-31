
const category=(atmIds,result)=>{
    const hardware_categories=[]
    const cashout_categories=[]
    const inservice_categories=[]

    const visited=new Set()

    for(var i=0;i<atmIds.length;i++){
       
        let fit=result[atmIds[i]].fitness_array
        let fitTemp=fit.substring(0,fit.length-1)
        let sen=result[atmIds[i]].sensor_array
        let sup=result[atmIds[i]].supply_array
        let tempSup=sup.substring(0,sup.length-1)
        
        
    
          // categorizing each atms into their categories
        if((fitTemp.includes('1')||fitTemp.includes('3')||fitTemp.includes('4'))||(sen.includes('2'))){
            hardware_categories.push(atmIds[i])
            
            visited.add(atmIds[i])
         
            
        }
    
        if(!(visited.has(atmIds[i]))){
         
            if(tempSup.includes('3')||tempSup.includes('4')) {
                cashout_categories.push(atmIds[i])
                visited.add(atmIds[i])
               
            }
        }
        if(!((visited.has(atmIds[i]))||(visited.has(atmIds[i])))){
            inservice_categories.push(atmIds[i])
   
        }
    }
    // console.log(inservice_categories);
    return {hardware_categories,cashout_categories,inservice_categories}
}
module.exports=category