const mongoose = require ('../Server/connect');

const adminSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    number:{
        type:Number,
        required:true,
        length:10
    },
    addmovies:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Movie"
            }]
    
});

const admin = mongoose.model("Admin",adminSchema);
module.exports=admin;