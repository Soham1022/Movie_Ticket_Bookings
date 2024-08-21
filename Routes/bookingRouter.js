const express= require ('express');
const BookingController = require('../Controller/bookingController');

const BookingRouter=express.Router();

BookingRouter.post('/',BookingController.newBooking);
BookingRouter.get('/:id',BookingController.getBookingbyId);
BookingRouter.delete('/:id',BookingController.deleteBooking);

module.exports=BookingRouter;