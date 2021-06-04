import React, { useState,useRef,useEffect } from 'react';
import { useHistory,Redirect } from 'react-router-dom'
import Axios from 'axios'


const Posts = ({ posts, loading }) => {
  // alert(posts.stock)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState(0);
  const [stock, setStock] = useState(0);

  const [productList, setProductList] = useState([]);
  const txtname = useRef('');
  const txtdescription=useRef('')
  const txtprice=useRef('')
  const txtlocation=useRef('')
  const txtstock=useRef('')
 

  Axios.defaults.withCredentials = true;
  const history = useHistory();
  const getproduct = (id) => {
    // alert(id)
    
    Axios.post("http://localhost:3001/getproduct", { id: id }).then((response) => {
      setProductList(response.data);
      txtname.current.value=response.data[0].Name
      txtdescription.current.value=response.data[0].Description
      txtprice.current.value=response.data[0].Purchase_prise
      txtlocation.current.value=response.data[0].WarehouseName
      txtstock.current.value=response.data[0].stock

    //  alert(response.data[0].stock)
    });

  };

  const UpdateProduct = (id) => {
    // alert(txtlocation.current.value)
    Axios.put("http://localhost:3001/UpdateProduct", { name: txtname.current.value, description: txtdescription.current.value, price: txtprice.current.value, location: txtlocation.current.value, stock: txtstock.current.value, id: id }).then(
      (response) => {
        setProductList(
          productList.map((val) => {
            return val.id == id
              ? {
                id: id,
                name: name,
                description: description,
                price: price,
                location: location,
                stock: stock
              }
              : val;
          })

        );
      
        window.location.reload();
      },
      // alert('Product updated Successfully!')
     
    );
    
    // <Redirect to="/Product" />
  };



  if (loading) {
    return <h2>No record Found</h2>;
  }

  const deleteproduct = (id) => {
    // alert(id)

    Axios.delete(`http://localhost:3001/delete/${id}`,).then((response) => { });

  };

  return (

    <table class="table">
      <thead>
        <tr>

          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Warehouse Name</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {productList.map((val, key) => {
          
          return (
            <tr>

              <td>
              <input
                  type="text"
                  placeholder="name"
                  ref={txtname}
                  style={{ height: '30px', width: '100px' }}
                  
                />
                </td>
               <td>
                <input
                  type="text"
                  placeholder="description"
                  ref={txtdescription}
                  style={{ height: '30px', width: '100px' }}
                  
                />
                </td>
                <td>
                <input
                  type="number"
                  placeholder="price"
                  ref={txtprice}
                  style={{ height: '30px', width: '100px' }}
                 
                />
                </td>
               <td>
                <input
                  type="text"
                  placeholder="location"
                  ref={txtlocation}
                  style={{ height: '30px', width: '100px' }}
                  
                />
                </td>
                <td>
                <input
                  type="number"
                  placeholder="stock"
                  ref={txtstock}
                  style={{ height: '30px', width: '100px' }}
                  
                />
              </td>

              <td><button class="btn btn-primary" style={{ height: '35px', width: '70px' }}
                onClick={() => {
                  UpdateProduct(val.Id);
                }}>Save</button> </td>

            </tr>
          );
        })}
        {posts.map(post => (
          
          <tr>
            
            <td>{post.Name}</td>
            <td>{post.Description}</td>
            <td>{post.Purchase_prise}</td>
            <td>{post.WarehouseName}</td>
            <td>{post.stock}</td>
            <td>
              <button class="btn btn-primary" style={{ height: '35px', width: '70px' }} 
              onClick={() => {
                const confirmBox = window.confirm("Do you really want to Delete this Product?")
                if (confirmBox === true) {
                  deleteproduct(post.Id)
                }
              }}
             >Delete</button>
         
              <button class="btn btn-primary" style={{ height: '35px', width: '70px',marginLeft:'10px' }} onClick={() => {
                getproduct(post.Id)

              }}>Edit</button>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  );
};

export default Posts;