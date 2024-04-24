import React, { useState, useEffect } from "react";
 
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../authService';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import  {CustomSidebar} from '../utilities/sidebar.js'
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import CategoryList from './category_list.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faPlus} from '@fortawesome/free-solid-svg-icons';

export default function CreateCategory() {
 
  const navigate = useNavigate();
  const [category_name, setcategory_name] = useState("")
  const[list_cat, setlist_cat] = useState("");
  const[newcatadd, setnewcatadd] = useState(0);
  const [validationError,setValidationError] = useState({});
  const [selectedOption, setSelectedOption] = useState();

  const [dataFromChild, setDataFromChild] = useState('');
  const [Edit, setEdit]= useState(false);
  const [EditID, setEditID] = useState(null)

  const [triggerEffect, setTriggerEffect] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append('category', category_name)
    if(selectedOption !== null && selectedOption != undefined) {
      formData.append('cat_parent_id', selectedOption.value)
    }
   
    const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      var submitpath = "";
  var token = localStorage.getItem('token');
  if(Edit) { 
        submitpath = `http://localhost:8081/api/blog/category/update?categoryId=${EditID}`;
  } else {
        submitpath = "http://localhost:8081/api/blog/category/create";
  }

    await axios.post(`${submitpath}`, formDataObject, {
    headers: {
      Authorization: `${token}`
    }
  }).then(({data})=>{
    setcategory_name("");
    setSelectedOption(null)
     
      Swal.fire({
        icon:"success",
        text:data.message
      }) 
      setTriggerEffect(prevState => !prevState);
      setEdit(false);
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

  const handleAddBTN = (e) => {
    setSelectedOption(null);
    setcategory_name('');
    setEdit(false);
    setEditID(null);
  }

  const fetchlistcategory = async() => { 
  var token = localStorage.getItem('token')
  await axios.get(`http://localhost:8081/api/blog/category/list`,  {
  headers: {
    Authorization: `${token}`
  }
}).then(({data})=>{
  console.log(data.message.data);
  setlist_cat(data.message.data);
 // setnewcatadd(newcatadd+1);
  }).catch(({response})=>{
    if(response.status===422){
       
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

  const receiveDataFromChild = (data) => {
    setDataFromChild(data);
    console.log(data.message);
    setcategory_name(data.message.data[0].name); 
    setEdit(true);
    setEditID(data.message.data[0].id);
   
   const option_name = list_cat.find(list => list.value === data.message.data[0].parent_cat_id);
   if(option_name){
    setSelectedOption({ label: option_name.label, value: data.message.data[0].parent_cat_id });
    console.log(data.message.data[0].name);
   } else {
    setSelectedOption(null);
   }
   
  };

  useEffect(() => {
    fetchlistcategory();  
  }, [newcatadd]); 

  return (<>
  <div>
    <CustomSidebar/>
    <div className="content">
      <div className="category_bk_page">

         <div className="category_form">
          <div className="heading-container">
         <h4>Add New Category</h4>
         <button type="button" style={{Color:"#fff",padding:"6px", "width": "32px",borderRadius: "8px"}} className="cat-add-btn"  onClick={(e)=>handleAddBTN(e)} > <FontAwesomeIcon icon={faPlus} /></button>
         </div>

          <form onSubmit={handleSubmit}>
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
              <div className="row">
                <label htmlFor="parent_cat">Parent Category</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={list_cat}
                  value={selectedOption}
                />
                {console.log(list_cat)}
              </div>
              <button type="submit">Submit</button>
          </form>
          </div>
          <CategoryList sendDataToParent={receiveDataFromChild} triggerEffect={triggerEffect} />
          </div>
          </div>
          </div>
      
    </>
  )
}