
const mongoose=require('mongoose');
// const student= new mongoose.Schema({
//     Student_name: String,
//     age:String,
//     gender:String,
//     phoneNumber: String,
//     section:String,
//     email: String,
    
    
//     password: String
// });




const student= new mongoose.Schema({
    St_username: {
        type: String,
        required: true,
        index: {unique: true},
        trim: true,
        minLength: 3
    },
    St_FirstName: {
        type: String,
        required: true,
        reim: true,
        minLength: 3
    },
    St_LastName: {
        type: String,
        required: true,
        reim: true,
        minLength: 3
    },
    St_Date_Of_Birth: { 
        type: String,
        required: true
    },
    St_Gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    St_Country: {
        type: String,
        required: true,
       
    },
    St_Address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    St_City: {
        type: String,
        required: true,
        enum: ['Cairo', 'Giza']
    },
    St_Phone_Number: {
        type: Number,
        required:true
    },
    St_Email:{
        type: String,
        require: true
    },
    
    
    St_SchoolName: {
        type: String,
        required: true
    },
    St_EducationalType: {
        type: String,
        required: true,
        enum: ['Thanwy', 'IG', 'IB']
    },
    St_Password: {
        type: String,
        required: true
    }

},    {
    timestamps: true,
});




module.exports= mongoose.model("Student",student)