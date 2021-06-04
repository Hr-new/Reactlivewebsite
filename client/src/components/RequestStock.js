import React, { useState,useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";


export default function RequestStock() {
  const [warehousename, setWarehouseName] = useState("");
  const [productname, setProductName] = useState("");
  const [productdescription,setProductDescription] = useState("");
  const [productprice, setProductPrice] = useState("");

  const [stock, setStock] = useState(0);

  const [productList, setProductList] = useState([]);
  const id=sessionStorage.getItem('Id')
  const[users,setUsers]=useState([]);

  Axios.defaults.withCredentials = true;
  const history=useHistory();
  const a=sessionStorage.getItem('Id')
  if (!a)
  {
    history.push('/login')
  }

  const RequestStock = () => {
      
    if(warehousename!='' && productname!='' && productdescription!='' && productprice!='' && stock!='' && id!='') 
    {
    Axios.post("http://localhost:3001/RequestStock", {
        warehousename: warehousename,
        productname:productname,
        productdescription:productdescription,
        productprice:productprice,
        stock: stock,
        id:id,
      
    }).then(() => {
      setProductList([
        ...productList,
        {
            warehousename: warehousename,
            productname:productname,
            stock: stock,
            productdescription:productdescription,
            productprice:productprice,
            id:id,
            
        },
      ]);
      alert('Your Request Submited')
    });
  }
 
  else { alert('Please Fill All the Value') }
    history.push('/RequestStock')
  };

 
  useEffect(() => {
    Axios.get("http://localhost:3001/warehouse" , {
      mode: "no-cors"
    }).then((response) => {
      
       setUsers( response.data)

    }).catch(function(error) {
      console.log(error);
    });
}, []);
  
 



  return (
    <div className="content-wrapper">
    <div className="App">
            
      <div className="users">
        <h1>Request Stock</h1>
        <label>WarehouseName:</label>
        <div >
            <select style={{ width: '320px', height: '40px' }} aria-label="Default select example" onChange={(e) => {
              setWarehouseName(e.target.value);
            }}>
              <option>Select Warehouse</option>
              {users.map((user) => {
                return <option>{user.Name}</option>;
              })}
            </select>
          </div>
         <label>ProductName:</label>
        <input
          type="text"
          onChange={(event) => {
            setProductName(event.target.value);
          }}
        />
          <label>ProductDescription:</label>
        <input
          type="text"
          onChange={(event) => {
            setProductDescription(event.target.value);
          }}
        />
         <label>ProductPrice:</label>
        <input
          type="number"
          onChange={(event) => {
            setProductPrice(event.target.value);
          }}
        />
        <label>Quantity</label>
        <input
          type="number"
          onChange={(e) => {
            setStock(e.target.value);
          }}
        />
        <br/>
        <button class="btn btn-primary" onClick={RequestStock}> Request Stock </button>
        <br/>
        
      </div>
     
    
    </div>
    </div>

  );
}
