const mongoose = require("../Server/connect");

const movieSchema= mongoose.Schema({
    title:{
       type:String,
       required: true
    },
    description:{
        type:String,
        required: true
    },
    actors:[{
        type:Array,
        required: true
    }],
    releaseDate:{
        type:Date,
        required: true
    },
    posterUrl:{
        type:String,
        required: true
    },
    featured:{
        type:Boolean,
    },
    bookings:[{type:mongoose.Types.ObjectId, ref:"Booking"}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
       required: true
    }
})

const MovieModel= mongoose.model("Movie",movieSchema);

module.exports=MovieModel;