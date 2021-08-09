const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

const Student_Registeration_Info_Schema = new Schema({
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
        type: Date,
        required: true
    },
    St_Gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    St_Country: {
        type: String,
        required: true,
        enum: ['EG']
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
        enum: ['Cairo', 'Jizah']
    },
    St_Phone_Number: {
        type: Number,
        required:true
    },
    St_Email:{
        type: String,
        require: true
    },
    /*
    St_Password: {
        type: String,
        required: true
    },*/
    St_SchoolName: {
        type: String,
        required: true
    },
    St_EducationalType: {
        type: String,
        required: true,
        enum: ['Thanwy', 'IG', 'IB']
    }

},    {
    timestamps: true,
});

const Student = mongoose.model('Student_Registeration_Info', Student_Registeration_Info_Schema);

module.exports = Student;