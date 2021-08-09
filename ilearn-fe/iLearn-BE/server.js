// const cors = require('cors')
// const express = require('express')
// const mongoose = require('mongoose')

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const StudentRegisteration_route = require('./routes/St_Registerations');
// app.use('/Student_Register', StudentRegisteration_route);

// app.listen(port, () => {
//     console.log('Server listening on port: ' + port);
// });



const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const Student=require("/Users/Nada/Desktop/Project X/SQLStudentCourse/iLearn/ilearn-fe/iLearn-BE/models/Student_Register.model.js")

// const Student = require("/Users/Nada/Desktop/Project X/Passport Auth/backend/student.js");

// diSWSTnA2x3SbTXJ


mongoose.connect(
    "mongodb+srv://sa:passwordHAVOKDEV@havokcluster.jkouf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    // "mongodb+srv://UserAuth:diSWSTnA2x3SbTXJ@cluster0.chqq3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Mongoose Is Connected");
    }
  );


  const getUserByEmail = (St_Email) => {
    return new Promise((resolve, reject) => {
      
    
      if(!St_Email) return false
    
      try {
        Student.findOne({ St_Email: St_Email }, (error, data) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(data);
          
        });
      } catch (error) {
        reject(error);
      }
    });
  };



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(session({
    secret: "secretcode",
    resave:true,
    saveUninitialized:true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport)


app.post("/login",(req,res, next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if (err) throw err;
        if (!user) res.send("No user exists");
        else {
            req.logIn(user,err =>{
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req,res, next);
});



app.post("/register",(req,res)=>{
    User.findOne({username:req.body.username},async (err,doc)=>{
        if(err) throw err;
        if(doc) res.send("User already registered");
        if(!doc) {
            const hashedPassword=await bcrypt.hash(req.body.password,10)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("User Created")
        }
    })
});





app.post("/registerStudent",(req,res)=>{
    Student.findOne({Student_name:req.body.Student_name},async (err,doc)=>{
        if(err) throw err;
        if(doc) res.send("User already registered");
        if(!doc) {
            const hashedPassword=await bcrypt.hash(req.body.password,10)
            const newStudent = new Student({
                Student_name: req.body.Student_name,
                age:req.body.age,
                gender:req.body.gender,
                phoneNumber: req.body.phoneNumber,
                section:req.body.section,
                email: req.body.email,
                password: hashedPassword
            });
            await newStudent.save();
            res.send("Student Created")
        }
    })
});

app.post("/getStudent",async (req,res)=>{

  console.log(req.body)
  
  const {St_Email, password}=req.body


  if(!St_Email || !password){
    return res.json({status:"error", message:"Invalid Email"})

    

  }

  const student= await getUserByEmail(St_Email)



  console.log(student)


  res.json({status:"Success",message:" Login Successfully"})


    
});




app.get("/user",(req,res)=>{
    res.send(req.user);
});

app.listen(4000, () =>{
    console.log("Server has started")
})