import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


export default function CategoryList({sendDataToParent, triggerEffect}) {
 
  const navigate = useNavigate(); 
 
  const [data, setdata] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [pageSize, setpageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [TotalPage, setTotalPage] = useState(0);
  const [serial_number, setserial_number] = useState(0); 
  const [items, setitems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + pageSize; 
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / pageSize);
  const [Edit, setEdit]= useState(true);
  const [validationError,setValidationError] = useState({});



  const getcategory_details = async(id) => {
    var token = localStorage.getItem('token')
    await axios.get(`http://localhost:8081/api/blog/category/single`,{
      headers: {
     Authorization: `${token}`
   },params: {
      cat_id: id
    },
  }).then(({data})=>{
    console.log(data);
    sendDataToParent(data);

      
  }).catch(({response})=>{
  if(response.status===422){
     // navigate("/login")
  }else if(response.status===403){
     // navigate("/login")
  }else{
     // navigate("/login")
  }
})

  } 
  const handleEdit = (e, id) => {
    e.defaultPrevented = true;
    var single_details = getcategory_details(id);
    console.log(single_details);
  }

  const handleDeleteCategory = async(id) => {
    console.log('called deleted ' + id);

    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed
    });

    if(!isConfirm){
      return;
    }
    const formData = new FormData()

    formData.append('id', id)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

var token = localStorage.getItem('token')
    await axios.post(`http://localhost:8081/api/blog/category/delete/`,formDataObject,{
       headers: {
      Authorization: `${token}`
    }
  }).then(({data})=>{
      Swal.fire({
          icon:"success",
          text:data.message
      })
      fetchCategory(1)
    }).catch(({response:{data}})=>{
      Swal.fire({
          text:data.message,
          icon:"error"
      })
    })

  }
   
  const columns = [
        {
           name: '#',
           selector: (_, index) => index+(currentPage*10)+1,
           width:'50px'
        },
        {
           name: 'Category Name',
           cell: row => { return ( row.name )},
          
        },
        {
           name: 'Parent Category Name',
           cell: row => { return ( row.parent_category_name )},
            
        },
        {
           name: 'Action',
           selector: row => row.email,
            cell: row => {  return (
              <div>
              <div className="gk-btn-group " style={{minWidth:"80px"}} role="group" aria-label="Basic example">
                  <button type="button" style={{backgroundColor:"#ffc107",border:"0px", color: '#000'}} className="btn btn-warning"  onClick={(e)=>handleEdit(e,row.id)} > <FontAwesomeIcon icon={faEdit} />
                
                
                  </button>
                  <button type="button" className="btn btn-danger" style={{backgroundColor:"#FA778E",border:"0px", color: '#fff'}} onClick={()=>handleDeleteCategory(row.id)} ><FontAwesomeIcon icon={faTrash}/></button>
              </div>
          </div> )    },
        },
   ];
 
  const pushtoitems = (total_counts) => {
    const item_arr = []
    for ( var i = 1; i <= total_counts; i++) {
        item_arr.push(i);
    }
    setitems(item_arr);
}
  const fetchCategory = async (pageNumber) => {
    var token = localStorage.getItem('token')
    await axios.get(`http://localhost:8081/api/blog/category/listall`,{
        headers: {
       Authorization: `${token}`
     },params: {
        page: pageNumber,
        size: pageSize,
      },
  
    }).then(({data})=>{
      console.log(data); 
        setdata(data.message['data']);
        setTotalRecords(data.message['total_records'])
        pushtoitems(data.message['total_records']);
        setTotalPage(Math.ceil(data.message['total_records']/pageSize)) 
    }).catch(({response})=>{
    if(response.status===422){
       // navigate("/login")
    }else if(response.status===403){
       // navigate("/login")
    }else{
       // navigate("/login")
    }
  })

} 


const handlePageClick = (event) => {
  console.log(event.selected+1);
  const newOffset = (event.selected * pageSize) % items.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
   setItemOffset(newOffset);
   fetchCategory(event.selected+1);
   setcurrentPage(event.selected)
   
}
 

  useEffect(() => {
    fetchCategory(1);
  }, []); 
  
  useEffect(() => {
    fetchCategory(1);
  }, [triggerEffect]); 

  return (<>
          <div className="cat_list">
          <h4>Category List</h4>
          <div className="catlist-container">
          <DataTable
                columns={columns}
                data={data}
          />
            <div className="reacts-pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
     
      </div>
        </div>
          </div>
    </>
  )
}