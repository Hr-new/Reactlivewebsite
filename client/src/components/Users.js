import React from 'react';


const Users = ({ posts, loading }) => {

  if (loading) {
    return <h2>No record Found</h2>;
  }

  return (
   
       <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Warehouse</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
      {posts.map(post => (
      
          <tr>
            <th scope="row">{post.Id}</th>
            <td>{post.Name}</td>
            <td>{post.Description}</td>
            <td>{post.Purchase_prise}</td>
            <td>{post.Location}</td>
            <td>{post.stock}</td>
          </tr>
         
      ))}
            </tbody>
      </table>
  );
};

export default Users;