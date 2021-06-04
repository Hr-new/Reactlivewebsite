import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";
export default function UpdateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState(0);
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState(0);
    const [stock, setStock] = useState(0);

    const [productList, setProductList] = useState([]);


    Axios.defaults.withCredentials = true;
    const history = useHistory();

    const a=sessionStorage.getItem('Id')
    if (!a)
    {
      history.push('/login')
    }

    const UpdateProduct = () => {
        // alert(newrole)
        Axios.put("http://localhost:3001/UpdateProduct", { name: name, description: description, price: price, location: location, stock: stock, id: id }).then(
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
                
            }
        );
        history.push('/Product');
    };
    return (
        <div className="content-wrapper">
        <div className="App">
            <div className="users">

                            <div className="information">
                            <input
                                    type="number"
                                    placeholder="id"
                                    onChange={(event) => {
                                        setId(event.target.value);
                                    }}
                                />
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="name"
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="description"
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                />
                                <br></br>
                                <input
                                    type="number"
                                    placeholder="price"
                                    onChange={(event) => {
                                        setPrice(event.target.value);
                                    }}
                                />
                                <br></br>
                                <input
                                    type="number"
                                    placeholder="location"
                                    onChange={(event) => {
                                        setLocation(event.target.value);
                                    }}
                                />
                                <br></br>
                                <input
                                    type="number"
                                    placeholder="stock"
                                    onChange={(event) => {
                                        setStock(event.target.value);
                                    }}
                                />
                                <br></br>
                                
                                <button onClick={() => { UpdateProduct();}} >
                                    {" "}
                                    UpdateProduct
                                </button>


                                
                            </div>
          
            </div>
        </div>
        </div>

    );
}