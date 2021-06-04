import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";
export default function DeleteProduct() {
    
    const [id, setId] = useState(0);
 

    const [productList, setProductList] = useState([]);


    Axios.defaults.withCredentials = true;
    const history = useHistory();

    const deleteproduct = () => {
        // alert(id)
        Axios.delete(`http://localhost:3001/delete/${id}`,).then((response) => {
            setProductList(
            productList.filter((val) => {
              return val.id != id;
            })
          );
        });
        history.push('/Product');
      };
      return (
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
                                <button
                                    onClick={() => { deleteproduct(id); }}
                                >
                                    Delete
                                </button>
                                </div>
                                </div>
                                </div>
                                    );
                                }