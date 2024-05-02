import React, { useState, useEffect } from "react";
 
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../authService';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import  {CustomSidebar} from '../utilities/sidebar.js'

import Select from 'react-select';


export default function CreateProduct() {
 
  const navigate = useNavigate();
  const [category_name, setcategory_name] = useState("")
  const [validationError,setValidationError] = useState({});


  const optionsofdealer = [
    { value: '1', label: 'Dealer 1' },
    { value: '2', label: 'Dealer 2' },
    { value: '3', label: 'Dealer 3' }
  ];
  const option_category = [
    { value: '1', label: 'category 1' },
    { value: '2', label: 'category 2' },
    { value: '3', label: 'category 3' }
  ]; 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData() 
    const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

  
  var token = localStorage.getItem('token')

    await axios.post(`http://localhost:8081/api/products/create`, formDataObject, {
    headers: {
      Authorization: `${token}`
    }
  }).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else if(response.status===403){
        navigate("/login")
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (<> 
  <div>
    <CustomSidebar/>
    <div>
         <div className="customform">
        <h2>Register Category</h2>
          <form >
            <div className="row">
              <label htmlFor="category_name">Name</label>
              <input type="text"
                name="category_name"
                autoComplete="off"
                value={category_name} 
                onChange={(event)=>{
                  setcategory_name(event.target.value);
                }}
                />
            </div>
             
            <button type="submit">Registration</button>
      </form>
      
          </div>
      </div>
        </div>
    </>
  )
}
