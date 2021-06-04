import React, { useState, useEffect, Component } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";



// export default class AddProduct extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name:'',
//       description:'',
//       price:'',
//       location:'',
//       stock:'',
//       productList:[]

//     };
//   }

//   componentDidMount() {
//     var self = this;
//     axios
//       .get("http://localhost:3001/product", {
//         mode: "no-cors"
//       })
//       .then(function(response) {
//         self.setState({ users: response.data });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });

//   }

//   const AddProduct = () => {
//     alert(location)
//     if(name!='' && description!='' && price!='' && location!='' && stock!='' ) 
//     {

//     Axios.post("http://localhost:3001/AddProduct", {
//       name: name,
//       description: description,
//       price: price,
//       location: location,
//       stock: stock,

//     }).then(() => {
//       setProductList([
//         ...productList,
//         {
//             name: name,
//             description: description,
//             price: price,
//             location: location,
//             stock: stock,

//         },
//       ]);

//     });
//     // history.push('/Product')
//   }

//     else { alert('Please Fill All the Value') }


//   };

//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }



export default function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState(0);
  const [stock, setStock] = useState(0);

  const [productList, setProductList] = useState([]);
  const [users, setUsers] = useState([]);


  Axios.defaults.withCredentials = true;
  const history = useHistory();

  const AddProduct = () => {
    // alert(location)
    if (!name || !description || !price || !location || !stock ) {
      alert('Please Fill All the Value')
    }
    else {  


      Axios.post("http://localhost:3001/AddProduct", {
        name: name,
        description: description,
        price: price,
        location: location,
        stock: stock,

      }).then(() => {
        setProductList([
          ...productList,
          {
            name: name,
            description: description,
            price: price,
            location: location,
            stock: stock,

          },
        ]);

      });
      history.push('/Main')


      
     
    }

    


  };

  //For Dropdown
  useEffect(() => {
    Axios.get("http://localhost:3001/warehouse", {
      mode: "no-cors"
    }).then((response) => {

      setUsers(response.data)

    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn !== true) {
            history.push('/Login')

        }

    });
}, []);

  // const done = () => {
  //   history.push('/Product')
  // };

  // console.log(users)



  return (
    <div className="content-wrapper">
      <div className="App">

        <div className="users">
          <h1>Add Product</h1>
          <label>Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Description:</label>
          <input
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <label>PurchasePrice:</label>
          <input
            type="number"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label>WarehouseName</label>
          <div >
            <select style={{ width: '320px', height: '40px' }} aria-label="Default select example" onChange={(e) => {
              setLocation(e.target.value);
            }}>
              <option>Select Warehouse</option>
              {users.map((user) => {
                return <option>{user.Name}</option>;
              })}
            </select>
          </div>

          <label>Stock</label>
          <input
            type="text"
            onChange={(e) => {
              setStock(e.target.value);
            }}
          />
          <br />
          <button class="btn btn-primary" onClick={AddProduct}> Add Product </button>
          {/* <button onClick={done}> Done </button> */}
        </div>


      </div>

    </div>
  );
}
