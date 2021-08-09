import React,{useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerDateOfBirth, setRegisterDateOfBirth] = useState("");
  const [registerGender, setRegisterGender] = useState("");
  const [registerCountry, setRegisterCountry] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerCity, setRegisterCity] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerSchoolName, setRegisterSchoolName] = useState("");
  const [registerEducationalType, setRegisterEducationalType] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  
  
  

  const register=()=>{
          
    axios({
      method: "POST",
      data: {
        St_username:registerUsername,
        St_FirstName:registerFirstName,
        St_LastName:registerLastName,
        St_Date_Of_Birth:registerDateOfBirth,
        St_Gender:registerGender,
        St_Country:registerCountry,
        St_Address:registerAddress,
        St_City:registerCity,
        St_Phone_Number:registerPhoneNumber,
        St_Email:registerEmail,
        St_SchoolName:registerSchoolName,
        St_EducationalType:registerEducationalType,
        St_Password: registerPassword
      },
      withCredentials:true,
      url: "http://localhost:4000/registerStudent",
    }).then((res) => console.log(res))
  }
  
  const login=()=>{
    axios({
      method: "POST",
      data: {
        St_username: loginUsername,
        St_Password: loginPassword
      },
      withCredentials:true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res))
  }

  const getUser=()=>{
    axios({
      method: "GET",
      
      withCredentials:true,
      url: "http://localhost:4000/getStudent",
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
      
    
    }


    )
  }


  return (
    <div className="App">
      
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="First Name"
          onChange={(e) => setRegisterFirstName(e.target.value)}
        />
        <br></br>
        <input
          placeholder="Last Name"
          onChange={(e) => setRegisterLastName(e.target.value)}
        />
        <input
          placeholder="Date Of Birth"
          onChange={(e) => setRegisterDateOfBirth(e.target.value)}
        />
        <br></br>
        <input
          placeholder="Gender"
          onChange={(e) => setRegisterGender(e.target.value)}
        />
        <input
          placeholder="Country"
          onChange={(e) => setRegisterCountry(e.target.value)}
        />
        <br></br>
        <input
          placeholder="Address"
          onChange={(e) => setRegisterAddress(e.target.value)}
        />
        <input
          placeholder="City"
          onChange={(e) => setRegisterCity(e.target.value)}
        />
        <br></br>
        <input
          placeholder="Phone Number"
          onChange={(e) => setRegisterPhoneNumber(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <br></br>
        <input
          placeholder="School Name"
          onChange={(e) => setRegisterSchoolName(e.target.value)}
        />
        <input
          placeholder="Educational Type"
          onChange={(e) => setRegisterEducationalType(e.target.value)}
        />
        <br></br>
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      
      
      
      
      
      
      
      
      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.St_username}</h1> : null}
      </div>
    </div>



  );
}

export default App;
