const mongoose = require('mongoose');
const BookingModel = require('../ModelSchema/BookingSchema');
const MovieModel = require('../ModelSchema/movieSchema');
const reguser = require('../ModelSchema/regSchema');

class BookingController {
    static newBooking = async (req, res) => {
        try {
             const { movie, date, seatno, user } = req.body;
            const booking = new BookingModel({ movie, date: new Date(`${date}`), seatno, user });
            // const bookings = await booking.save();
            const existingMovie = await MovieModel.findById(movie);
            const existinguser = await reguser.findById(user); 
            if (!booking) {
                res.status(404).json({ msg: "Invalid Bookings" })
            }
            res.status(200).json({ Booking: booking });

             if (!existingMovie) {
                res.status(404).json({msg:"Movie not found"});
            }
            if (!existinguser) {
                res.status(404).json({msg:"User not found"});
            }

            const session = await mongoose.startSession();
            session.startTransaction();
            existinguser.bookings.push(booking);
            existingMovie.bookings.push(booking);
            await existinguser.save({session});
            await existingMovie.save({session});
            await booking.save({session});
            session.commitTransaction();
        } catch (error) {
            res.status(404).json({ msg: error.message , msge:"err"});
        }
    }

    static getBookingbyId=async(req,res)=>{
        try {
            const data = req.params.id;
            const BookId= await BookingModel.findById(data);
            if (!BookId) {
                res.status(404).json({msg:error.message});
            }
            else{
                res.status(200).json({ Booking: BookId });
            }
        } catch (error) {
            res.status(404).json({msg:error.message});
        }
    }


    
    static deleteBooking=async(req,res)=>{
        try {
            const id = req.params.id;
            const booking=await BookingModel.findByIdAndDelete(id).populate("movie user");
            console.log(booking);
            const session = await mongoose.startSession();
            session.startTransaction();
            await booking.user.bookings.pull(booking);
            await booking.movie.bookings.pull(booking);
            await booking.user.save({session});
            await booking.movie.save({session});
            session.commitTransaction();

            if (!booking) {
                res.status(400).json({msg:"Unable to delete"});
            } else {
                res.status(200).json({msg:"Booking deleted"});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({msge:error.message});
        }
    }
}

module.exports = BookingController;