const router = require('express').Router()

let Student_Reg = require('../models/Student_Register.model')

router.route('/').get((req, res) => {
    Student_Reg.find()
        .then(St_Registerations => res.json(St_Registerations))
        .catch(err => res.status(400).json('Erro:' + err));
})

router.route('/add').post((req, res) => {
    const St_username = req.body.St_username;
    const St_FirstName = req.body.St_FirstName;
    const St_LastName = req.body.St_LastName;
    const St_Date_Of_Birth = req.body.St_Date_Of_Birth;
    const St_Gender = req.body.St_Gender;
    const St_Country = req.body.St_Country;
    const St_Address = req.body.St_Address;
    const St_City = req.body.St_City;
    const St_Phone_Number = req.body.St_Phone_Number;
    const St_Email = req.body.St_Email;
    const St_SchoolName = req.body.St_SchoolName;
    const St_EducationalType = req.body.St_EducationalType;


    const new_StudentRegisteration = new Student_Reg({
        St_username,
        St_FirstName,
        St_LastName,
        St_Date_Of_Birth,
        St_Gender,
        St_Country,
        St_Address,
        St_City,
        St_Phone_Number,
        St_Email,
        St_SchoolName,
        St_EducationalType
    });
    new_StudentRegisteration.save()
        .then(() => res.json('Student Info Submitted!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Student_Reg.findById(req.params.id)
        .then(Student_Register => res.json(Student_Register))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Student_Reg.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Student Deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Student_Reg.findById(req.params.id)
        .then(Student_Register => {
           Student_Register.St_username = req.body.St_username;
           Student_Register.St_FirstName = req.body.St_FirstName;
           Student_Register.St_LastName = req.body.St_LastName;
           Student_Register.St_Date_Of_Birth = req.body.St_Date_Of_Birth;
           Student_Register.St_Gender = req.body.St_Gender;
           Student_Register.St_Country = req.body.St_Country;
           Student_Register.St_Address = req.body.St_Address;
           Student_Register.St_City = req.body.St_City;
           Student_Register.St_Phone_Number = req.body.St_Phone_Number;
           Student_Register.St_Email = req.body.St_Email;
           Student_Register.St_School = req.body.St_School;
           Student_Register.St_EducationalType = req.body.St_EducationalType;

           Student_Register.save()
            .then(() => res.json('Student Info Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;