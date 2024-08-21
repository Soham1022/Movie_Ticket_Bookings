const mongoose =require("../Server/connect");

const regSchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },   
    email:{
        type: String,
        required:true,
        unique: true
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
    bookings:[{type:mongoose.Types.ObjectId, ref:"Booking"}]
})


const reguser=mongoose.model("RegisteredData",regSchema);
module.exports=reguser;