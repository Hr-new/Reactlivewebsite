import React from 'react';
import Axios from "axios";


const Requests = ({ posts, loading }) => {
   
  // if (loading) {
  //   return <h2>No Request Found</h2>;
  // }
  
  const acceptRequest = (id) => {
    // alert(id)
    Axios.put(`http://localhost:3001/acceptRequest/${id}`).then((response) => {
      
    });
  };

  const rejectRequest = (id) => {
    // alert(id)
    Axios.put(`http://localhost:3001/rejectRequest/${id}`).then((response) => {
      
    });
  };
 
  return (
    
    <div className="container">
      
        <div className='container mt-5'>
      
       <table class="table">
        <thead>
          <tr>
            
            <th scope="col">WarehouseName</th>
            <th scope="col">ProductName</th>
            <th scope="col">Stock</th>
            <th scope="col">RequestBy</th>
            <th scope="col">Action</th>
            
          </tr>
        </thead>
        <tbody>
      {posts.map(post => (
      
          <tr>
            
            <td>{post.warehousename}</td>
            <td>{post.productname}</td>
            <td>{post.stock}</td>
            <td>{post.requestby}</td>
           
            <td >{ <button style={{height: '30px', width : '60px'}}  onClick={() => {acceptRequest(post.Id); }}> Accept  </button>}
            { <button   style={{height: '30px', width : '60px'}}  onClick={() => {rejectRequest(post.Id); }} > Reject  </button>} </td>
           
          </tr>
          
         
      ))}
            </tbody>
      </table>

      </div>
            </div>
            
     
      
      
  );
};

export default Requests;