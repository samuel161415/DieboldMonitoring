const router=require('express').Router();
const moment=require('moment')
const Diebold_data =require('../model/diebold')
router.post('/single',async(req,res)=>{
    const {terminalIds,startDate,endDate}=req.body
    console.log('terminallIds',terminalIds.length);

    

   
    try{
        const final_result=[]
        const result=await Diebold_data.find({createdAt:{$gte:new Date(startDate),$lte:new Date(endDate)}});
        
        for(var i=0;i<result.length;i++){
         
            const hardware= result[i].categories.hardware_categories
            const cash= result[i].categories.cashout_categories
            const inservice= result[i].categories.inservice_categories
           
           
            for(var j=0;j<terminalIds.length;j++){
                
                if(final_result.length===terminalIds.length){
                   
                    if(hardware.includes(terminalIds[j])){
                        final_result[j].online+=2
                        final_result[j].hardware+=2
                     }
                    else if(cash.includes(terminalIds[j])){
                        final_result[j].online+=2
                        final_result[j].cashout+=2
                    }
                    else if(inservice.includes(terminalIds[j])){
                        final_result[j].online+=2
                        final_result[j].inservice+=2
                    }
                    else{
                        final_result[j].offline+=2
                    }
                }
                else{
                    let obj={
                        offline:0,
                        online:0,
                        hardware:0,
                        cashout:0,
                        inservice:0
                    }
                    if(hardware.includes(terminalIds[j])){
                        obj.online+=2
                        obj.hardware=2
                        
                     }
                    else if(cash.includes(terminalIds[j])){
                        obj.online+=2
                        obj.cashout+=2
                    }
                    else if(inservice.includes(terminalIds[j])){
                        obj.online+=2
                        obj.inservice+=2
                    }
                    else{
                        obj.offline+=2
                    }
                    console.log('obj',obj);
                    final_result.push(obj)
                    
                    
                }
            }
        } 


       
        return res.send(final_result)

    }
    catch(err){
        return res.json(err)
    }
    

    




    //
})

module.exports=router