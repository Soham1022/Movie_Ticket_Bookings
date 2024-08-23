const mongoose = require ('mongoose');
const dotenv = require ('dotenv');

dotenv.config();


async function main() {
    return mongoose.connect(`mongodb+srv://mukherjeesoham1022:${process.env.Project_Password}@user.ys4zesg.mongodb.net/?retryWrites=true&w=majority&appName=User`);
}

main().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});


module.exports=mongoose;


// boY6vAinmmdHaWT6