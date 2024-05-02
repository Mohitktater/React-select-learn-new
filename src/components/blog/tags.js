import React, { useState, useEffect } from "react";
 
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom' 
import  {CustomSidebar} from '../utilities/sidebar.js'
import Select from 'react-select'; 
import Tag_list from './tag_list.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faPlus} from '@fortawesome/free-solid-svg-icons';

export default function CreateTag() {
 
  const navigate = useNavigate();
  const [tag_name, settag_name] = useState("")
  const[list_cat, setlist_cat] = useState("");
  const[newcatadd, setnewcatadd] = useState(0); 
  const [selectedOption, setSelectedOption] = useState();

  const [dataFromChild, setDataFromChild] = useState('');
  const [Edit, setEdit]= useState(false);
  const [EditID, setEditID] = useState(null)

  const [triggerEffect, setTriggerEffect] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append('tag', tag_name)
    
   
    const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      var submitpath = "";
  var token = localStorage.getItem('token');
  if(Edit) { 
        submitpath = `http://localhost:8081/api/blog/tag/update?tagId=${EditID}`;
  } else {
        submitpath = "http://localhost:8081/api/blog/tag/create";
  }

    await axios.post(`${submitpath}`, formDataObject, {
    headers: {
      Authorization: `${token}`
    }
  }).then(({data})=>{
    settag_name(""); 
     
      Swal.fire({
        icon:"success",
        text:data.message
      }) 
      setTriggerEffect(prevState => !prevState);
      setEdit(false);
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

  const handleAddBTN = (e) => {
    settag_name('');
    setEdit(false);
    setEditID(null);
  } 

  const receiveDataFromChild = (data) => {
    setDataFromChild(data);
    console.log(data.message);
    settag_name(data.message.data[0].name); 
    setEdit(true);
    setEditID(data.message.data[0].id);
   } 
   
  
 

  return (<>
  <div>
    <CustomSidebar/>
    <div className="content">
      <div className="category_bk_page">

         <div className="category_form">
          <div className="heading-container">
         <h4>Add New Tags</h4>
         <button type="button" style={{Color:"#fff",padding:"6px", "width": "32px",borderRadius: "8px"}} className="cat-add-btn"  onClick={(e)=>handleAddBTN(e)} > <FontAwesomeIcon icon={faPlus} /></button>
         </div>

          <form onSubmit={handleSubmit}>
              <div className="row">
               
              <label htmlFor="tag_name">Name</label>
                <input type="text"
                  name="tag"
                  autoComplete="off"
                  value={tag_name} 
                  onChange={(event)=>{
                  settag_name(event.target.value);
                }}
                />
              </div>
              
              <button type="submit">Submit</button>
          </form>
          </div>
          <Tag_list sendDataToParent={receiveDataFromChild} triggerEffect={triggerEffect} />
          </div>
          </div>
          </div>
      
    </>
  )
}