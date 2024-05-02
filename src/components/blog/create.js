import React, { useState, useEffect } from "react";
 
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom' 
import  {CustomSidebar} from '../utilities/sidebar.js'
import  {SearchableSelect} from './search.js'
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreateBlog() {
 
  const navigate = useNavigate(); 
  const [validationError,setValidationError] = useState({});
  const [content, setContent] = useState('');

  const [selectedValue, setSelectedValue] = useState('');
  const options = ['Apple', 'Banana', 'Orange', 'Grape', 'Watermelon'];
  const handleSelectChange = (selectedOption) => {

    console.log(selectedOption.value);
    setSelectedValue(selectedOption.value);
  };


 
 
 
  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the blog content
    console.log(content);
  };

  
  return (<> 
  <div>
    <CustomSidebar/>
    <div className="content">
    <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
        />

      <h1>Searchable Select Example</h1>
      <SearchableSelect options={options} onChange={handleSelectChange} />
      {selectedValue && (
        <p>Selected Fruit: {selectedValue}</p>
      )}

        <button type="submit">Save Blog Post</button>
      </form>


          </div>
          </div>
    </>
  )
}
