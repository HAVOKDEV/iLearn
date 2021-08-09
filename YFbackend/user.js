// const mongoose=require('mongoose');
// const user= new mongoose.Schema({
//     username: String,
//     password: String
// });


// module.exports= mongoose.model("User",user)



const mongoose=require('mongoose');
const user= new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    password: String
});


module.exports= mongoose.model("User",user)