const express = require ("express");
const ExpressRouter = require("./Routes/userRouter");
const cors = require ("cors");
const adminRouter = require("./Routes/adminRouter");
const MovieRouter = require("./Routes/movieRouter");
const BookingRouter = require("./Routes/bookingRouter");


const app=express();
const port=4000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());



app.use("/user",ExpressRouter);
app.use("/admin",adminRouter);
app.use("/movie",MovieRouter);
app.use("/booking",BookingRouter);




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})