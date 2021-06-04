import React from 'react';

const Stocks = ({ posts, loading }) => {
  if (loading) {
    return <h2>No record Found</h2>;
  }

  return (
   
       <table class="table">
        <thead>
          <tr>
            
            <th scope="col">ProductName</th>
            <th scope="col">TotalStock</th>
          </tr>
        </thead>
        <tbody>
      {posts.map(post => (
      
          <tr>
            
            <td>{post.name}</td>
            <td>{post.Total}</td>
          </tr>
         
      ))}
            </tbody>
      </table>
  );
};

export default Stocks;