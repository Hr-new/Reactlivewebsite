import React  from 'react';
import Axios from "axios";

import { useHistory } from "react-router-dom";


const Requests = ({ posts, loading }) => {
  const history=useHistory()
   
  if (loading) {
    return <h2>No Request Found</h2>;
  }
  
  const acceptRequest = (id) => {
    // alert(id)
    Axios.put(`http://localhost:3001/acceptRequest/${id}`).then((response) => {
      window.location.reload();
    });
    
  };

  const rejectRequest = (id) => {
    // alert(id)
    Axios.put(`http://localhost:3001/rejectRequest/${id}`).then((response) => {
      window.location.reload();
    });
  };
 
  return (
    

      
       <table class="table">
        <thead>
          <tr>
            
            <th scope="col">WarehouseName</th>
            <th scope="col">ProductName</th>
            <th scope="col">Stock</th>
            <th scope="col">RequestBy</th>
            <th scope="col" >Action</th>
            
          </tr>
        </thead>
        <tbody>
      {posts.map(post => (
      
          <tr>
            
            <td>{post.warehousename}</td>
            <td>{post.productname}</td>
            <td>{post.stock}</td>
            <td>{post.requestby}</td>
           
            <td >{ <button className='btn btn-primary' style={{height: '35px', width : '80px'}}  onClick={() => {acceptRequest(post.Id); }}> Accept  </button>}
          { <button  className='btn btn-primary'  style={{height: '35px', width : '80px',marginLeft:'20px'}}  onClick={() => {rejectRequest(post.Id); }} > Reject  </button>} </td>
           
          </tr>
          
         
      ))}
            </tbody>
      </table>

            
     
           
      
  );
};

export default Requests;