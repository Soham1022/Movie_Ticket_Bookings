const express = require ('express');
const regUser = require ('../Controller/userController');



const ExpressRouter = express.Router();

ExpressRouter.post('/register',regUser.registerUser);
ExpressRouter.post('/login',regUser.loginUser);
// ExpressRouter.get('/booking/:id',regUser.getById);
ExpressRouter.get('/data/:id',regUser.getUserById);
ExpressRouter.get("/bookings/:id", regUser.getBookingsOfUser);

 
module.exports=ExpressRouter;