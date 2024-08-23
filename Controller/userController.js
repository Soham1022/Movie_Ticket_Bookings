const BookingModel = require('../ModelSchema/BookingSchema');
const reguser = require('../ModelSchema/regSchema');
const bcrypt = require('bcrypt');



class regUser {
  static registerUser = async (req, res) => {
    try {
      const data = req.body;
      const Result = await reguser.findOne({ email: data.email })
      if (Result) {
        res.status(200).json({ msg: "email already existed" })
      }
      else {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        const us = new reguser();
        us.name = data.name;
        us.email = data.email;
        us.password = hashPassword;
        us.number = data.number;
        const user = await us.save();
        res.status(200).json({ msg: "insert success", info: user.name });
      }
    }
    catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  static loginUser = async (req, res) => {

    const data = req.body;
    const user = await reguser.findOne({ email: data.email });
    try { 
    if (!user) {
        res.status(200).json({ msg: "Invalid Email Id" })
    }
    else {
        const pass = bcrypt.hashSync(data.password, user.password)
        if (!pass) {
            res.status(404).json({ msg: "Invalid Password" })
        }        
        res.status(200).json({ id: user._id});

    }}
    catch (error) {
      console.log(error);
      
    }
}
  

  static getUserById = async (req, res) => {
    const id = req.params.id;
  // let user;
  try {
   const user = await reguser.findById(id);
   
   if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
   return res.status(200).json({ User:user });
  } catch (err) {
    return console.log(err);
  }  
  }

static getBookingsOfUser = async (req, res) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await BookingModel.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
  };

  // static getById = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const booking = await BookingModel.findById({ user: id });
  //     if (!booking) {
  //       res.status(404).json({ msg: "Can't get the booking data" });
  //     }
  //     else {
  //       res.status(200).json({ data: booking })
  //     }
  //   } catch (error) {
  //     res.status(404).json({ msg: error.message });
  //   }
  // }
}

// static loginUser = async (req, res) => {
//     const data = req.body;
//     const user = await reguser.findOne({ email: data.email });
//     if (!user) {
//       res.status(404).json({ msg: 'Invalid Emailid' })
//     }
//     else {
//       const isMatch = bcrypt.compareSync(data.password, user.password);
//       if (!isMatch) {
//         res.status(404).json({ msg: 'invalid Password' })
//       }
//       else {
//         res.status(200).json({ msg: `${user.name} Logged In` })
//       }
//     }
//   }
  

module.exports = regUser;