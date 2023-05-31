        const Diebold_data =require('../model/diebold')
        const atms=require('./fileReader')
        const atmFilter=require('../helper/atmFilter')
        const category=require('./atmCategory')
          const insertData=async()=>{
            const result={}  // obj that contains atm terminal id as key the other as array
            const atmIds=[]  // arr that contains all atm terminal ids
           
            atmFilter(atms,result,atmIds)
            const {hardware_categories,cashout_categories,inservice_categories}=category(atmIds,result)
             
           const data=await getData()
           var objResult={
            categories:{
                hardware_categories:hardware_categories,
                cashout_categories:cashout_categories, 
                inservice_categories:inservice_categories

               },
               atmIds:atmIds,
               result:result
           }
           //checking if the previous state is changed and if it does insert new data to database else leave
           if (JSON.stringify(data&&data.result)!==JSON.stringify(result)){
            const newData=new Diebold_data(objResult)
            
            try{
               const savedDiebold=await newData.save();
              
             
            }
            catch(err){
              console.log('error : ',err);
            }
           }
           else{
            const ctime=new Date()
            
           
             const cData=getData()
             let id=cData.id
             const updated=await Diebold_data.updateOne(
              { _id: id },
              { $set:
              {
                updatedAt:ctime
              } },
              {upsert:true} // used to insert if the object not found
           )
          // const update=await Diebold_data.findByIdAndUpdate({"_id":id},{
          //   $set:{
          //     updatedAt:ctime
          //   }},
          //   {upsert:true}
          // )
          
           }
          }
         const getData=async()=>{
            const data=await Diebold_data.find().sort({_id:-1}).limit(1);
            return data[0]
           }

        module.exports={insertData,getData}