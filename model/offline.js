const mongoose= require('mongoose')

const Offline=new mongoose.Schema({

    name:{type:Object, required:true},
    id:{type:String,required:true}

}, {
    timestamps:true
}
)
module.exports=mongoose.model("OFFLINE",Offline )