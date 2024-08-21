const mongoose = require("../Server/connect");

const bookingSchema= mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:'Movie',
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    seatno:{
        type:Number,
        required: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"RegisteredData",
        required: true
    }
})

const BookingModel = new mongoose.model('Booking',bookingSchema);

module.exports=BookingModel;