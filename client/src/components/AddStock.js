import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";


export default function AddStock() {
  const [name, setName] = useState("");

  const [stock, setStock] = useState(0);

  const [productList, setProductList] = useState([]);

  Axios.defaults.withCredentials = true;
  const history=useHistory();

  const AddProduct = () => {
    console.log(name,stock)
    Axios.put("http://localhost:3001/Addstock", {
      name: name,
      stock: stock,
      
    }).then(() => {
      setProductList([
        ...productList,
        {
            name: name,
            stock: stock,
            
        },
      ]);

    });
  };

 

  
 



  return (
    <div className="content-wrapper">
    <div className="App">
            
      <div className="users">
        <h1>Add Stock</h1>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        
        <label>Quantity</label>
        <input
          type="text"
          onChange={(e) => {
            setStock(e.target.value);
          }}
        />
        <br/>
        <button  class="btn btn-primary" onClick={AddProduct}> Add Stock </button>
        
      </div>
     
    
    </div>

    </div>
  );
}
