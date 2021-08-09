const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const JWT=require("jsonwebtoken")

const Student = require("/Users/Nada/Desktop/Project X/ILearn/backend/student.js");


function verifyJWT(req, res, next) {
    // removes 'Bearer` from token
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if (err) return res.json({isLoggedIn: false, message: "Failed To Authenticate"})
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            req.user.pfp = decoded.pfp
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}



// diSWSTnA2x3SbTXJ




// mongoose.connect(
//     "mongodb+srv://UserAuth:diSWSTnA2x3SbTXJ@cluster0.chqq3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     () => {
//       console.log("Mongoose Is Connected");
//     }
//   );



const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sa:passwordHAVOKDEV@havokcluster.jkouf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();

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



// app.post("/login",(req,res, next)=>{
//     passport.authenticate("local",(err,student,info)=>{
//         if (err) throw err;
//         if (!student) res.send("No user exists");
//         else {
//             req.logIn(student,err =>{
//                 if (err) throw err;
//                 res.send("Successfully Authenticated");
//                 console.log(req.student);
//             });
//         }
//     })(req,res, next);
// });



// app.post("/register",(req,res)=>{
//     User.findOne({username:req.body.username},async (err,doc)=>{
//         if(err) throw err;
//         if(doc) res.send("User already registered");
//         if(!doc) {
//             const hashedPassword=await bcrypt.hash(req.body.password,10)
//             const newUser = new User({
//                 username: req.body.username,
//                 password: hashedPassword
//             });
//             await newUser.save();
//             res.send("User Created")
//         }
//     })
// });





app.post("/registerStudent",(req,res)=>{
    Student.findOne({St_username:req.body.St_username},async (err,doc)=>{
        if(err) throw err;
        if(doc) res.send("User already registered");
        if(!doc) {
            const hashedPassword=await bcrypt.hash(req.body.St_Password,10)
            const newStudent = new Student({
                St_username:req.body.St_username,
                St_FirstName:req.body.St_FirstName,
                St_LastName:req.body.St_LastName,
                St_Date_Of_Birth:req.body.St_Date_Of_Birth,
                St_Gender:req.body.St_Gender,
                St_Country:req.body.St_Country,
                St_Address:req.body.St_Address,
                St_City:req.body.St_City,
                St_Phone_Number:req.body.St_Phone_Number,
                St_Email:req.body.St_Email,
                St_SchoolName:req.body.St_SchoolName,
                St_EducationalType:req.body.St_EducationalType,
                St_Password: hashedPassword
            });
            await newStudent.save();
            res.send("Student Created")
        }
    })
});









app.post("/login", (req, res) => {
    
    const studentLoggingIn = req.body;
    console.log(req.body)

    if (!studentLoggingIn) return res.json({message: "Server Error"})

    

    
        Student.findOne({St_username: studentLoggingIn.St_username})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid Username or Password"})
            }
            bcrypt.compare(studentLoggingIn.St_Password, dbUser.St_Password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                        pfp: dbUser.pfp
                    }
                    JWT.sign(
                        payload, 
                        process.env.PASSPORTSECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Logged in Successfully", token: "Bearer " + token})
                        }
                    )

                    console.log(dbUser)
                } else {
                    return res.json({message: "Invalid Username or Password"})
                }
            })

        })
    
})






// app.post("/login", (req, res) => {
    
//     const studentLoggingIn = req.body;
//     console.log(req.body)

//     if (!studentLoggingIn) return res.json({message: "Server Error"})

    

    
//         Student.findOne({Student_name: studentLoggingIn.Student_name})
//         .then(dbUser => {
//             if (!dbUser) {
//                 return res.json({message: "Invalid Username or Password"})
//             }
//             bcrypt.compare(studentLoggingIn.password, dbUser.password)
//             .then(isCorrect => {
//                 if (isCorrect) {
//                     const payload = {
//                         id: dbUser._id,
//                         username: dbUser.username,
//                         pfp: dbUser.pfp
//                     }
//                     JWT.sign(
//                         payload, 
//                         process.env.PASSPORTSECRET,
//                         {expiresIn: 86400},
//                         (err, token) => {
//                             return res.json({message: "Success", token: "Bearer " + token})
//                         }
//                     )

//                     console.log(dbUser)
//                 } else {
//                     return res.json({message: "Invalid Username or Password"})
//                 }
//             })

//         })
    
// })








app.get("/user",(req,res)=>{
    res.send(req);
});


app.get("/getStudent", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username})
})

app.listen(4000, () =>{
    console.log("Server has started")
})