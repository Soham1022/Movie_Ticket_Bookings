const admin = require('../ModelSchema/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class adminController {
    static signUp = async (req, res) => {
        const data = req.body;
        const resData = await admin.findOne({ email: data.email });
        if (resData) {
            res.status(404).json({ msg: "Email id Already exists Please Sign In" })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(data.password, salt);
            const adm = new admin();
            adm.email = data.email;
            adm.password = hashPassword;
            const admres = await adm.save();
            res.status(200).json({ msg: "Sign up success" }) 
        }
    }

    static signIn = async (req, res) => {

        const data = req.body;
        const Result = await admin.findOne({ email: data.email });
        if (!Result) {
            res.status(200).json({ msg: "Invalid Email Id" })
        }
        else {
            const pass = bcrypt.hashSync(data.password, Result.password)
            if (!pass) {
                res.status(404).json({ msg: "Invalid Password" })
            }

            const token = jwt.sign({ id: Result._id }, process.env.Secret_Key, {
                expiresIn: "3hr"
            });

            res.status(200).json({ msg: `${Result.email} Logged In`, token, id: Result._id,msgs: `Your token will expire within ${token.expiresIn}` });

        }
    }

    static getAdmin = async (req, res) => {
        try {
            const admins = await admin.findById();
            if (!admins) {
                res.status(404).json({ msg: "Server Error" })
            }
            else {
                res.status(200).json({ admins });
            }
        } catch (error) {
            res.status(404).json({ msg: error.message })
        }
    }

    static getAdminById = async (req, res, next) => {
        const id = req.params.id;
      
        let admin;
        try {
          admin = await admin.findById(id).populate("addMovies");
        } catch (err) {
          return console.log(err);
        }
        if (!admin) {
          return console.log("Cannot find Admin");
        }
        return res.status(200).json({ admin });
      };
}

module.exports = adminController;