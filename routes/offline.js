const router=require('express').Router();
const Offlines=require('../model/offline')

router.get('/getOfflines',async(req,res)=>{
  const data=await Offlines.find()
  return res.send(data[0])
}
)


router.post('/updateOfflines',async(req,res)=>{
    // console.log('called',req.body);
    const updatedItem=req.body
    const updatedOffline=updatedItem.name
    var newObj={}
    try{
      
        // console.log('received item',req.body);
        const search= await Offlines.find({id:'offline'});
        console.log('searched',search);
        let eachSearch={}
        if(search.length>0){
            eachSearch=search[0].name
        }

        updatedOffline.map((val)=>{
            if(eachSearch && eachSearch[val]){
                
                newObj[val]=eachSearch[val]
            }
            else{
                newObj[val]=new Date().toLocaleString()
            }
            
            }) 
        
       
        
        console.log('new Object',newObj);
        const update=await Offlines.replaceOne({id:'offline'},{name:newObj,id:'offline'},{ upsert: true })
        // console.log('update to be send',update);
            res.send(newObj)
       
    }
    catch(err){
        console.log('opps',err);
        res.send('error'+err)
    }
    })
module.exports=router