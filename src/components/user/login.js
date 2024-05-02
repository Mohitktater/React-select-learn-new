import React, { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
 


export default function CreateUser() {
  const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [validationError,setValidationError] = useState({})

  const handlesubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', password)
     
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

// Now formDataObject is a JSON representation of your form data

    await axios.post(`http://localhost:8081/api/users/login`, formDataObject).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      localStorage.setItem('token', data.token_details);
 
      window.location.href = "/";
     // navigate("/")

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

  return (<div>
     <div className="customform">
    <h2>Login</h2>
      
      <form onSubmit={handlesubmit}>
     
        <div className="row">
          <label htmlFor="email">Email</label>
          <input type="email" 
          name="email" 
          autoComplete="off"
           placeholder="email@example.com"
          onChange={(event)=>{
            setemail(event.target.value)
          }}
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input 
          type="password"
          value={password}
          name="password"
          onChange={(event)=>{
            setpassword(event.target.value)
          }}
          />
        </div>
        <button type="submit">Login</button>
  
      </form>
  
      </div>
  </div>
  
 ); 
}
