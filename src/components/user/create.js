import React, { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [validationError,setValidationError] = useState({})
 

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', password)
    formData.append('first_name', first_name)
    formData.append('last_name', last_name)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

// Now formDataObject is a JSON representation of your form data

    await axios.post(`http://localhost:8081/api/users/create`, formDataObject).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/login")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div>
<div>
     <div className="customform">
    <h2>Registration</h2>
      
      <form onSubmit={handlesubmit}>
        <div className="row">
          <label htmlFor="first_name">First Name</label>
          <input type="text"
            name="first_name"
            autoComplete="off"
            value={first_name} 
            onChange={(event)=>{
              setfirst_name(event.target.value);
            }}
            />
        </div>
        <div className="row">
          <label htmlFor="last_name">Last Name</label>
          <input 
              type="text" 
              name="last_name"
              value={last_name} 
              onChange={(event)=>{
                setlast_name(event.target.value);
              }}
          />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            value={email} 
            onChange={(event)=>{
              setemail(event.target.value);
            }}
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input 
             type="password" 
            name="password"
            value={password} 
            onChange={(event)=>{
              setpassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Registration</button>
  </form>
  
      </div>
  </div>
    </div>
  );
  }
