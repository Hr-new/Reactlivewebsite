import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Axios from "axios"

import '../App.css';

const ViewWarehouse = () => {
  const [userList, setUserList] = useState([]);
  const Id = sessionStorage.getItem('Id')
  const history = useHistory()
  const a = sessionStorage.getItem('Id')
  if (!a) {
    history.push('/login')
  }

  useEffect(() => {
    const Id=sessionStorage.getItem('Id')
    Axios.post("http://localhost:3001/warehousedetails", { id: Id }).then((response) => {
      setUserList(response.data);
      console.log(response.data)


    });


  }, []);


  return (
    <div className="content-wrapper">
    <div className="container">
                <div className='container mt-5'>


      <table class="table">
        <thead>
          <tr>

            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>

          </tr>
        </thead>
        <tbody>

          {userList.map((val, key) => (

            <tr>

              <td>{val.name}</td>
              <td>{val.city}</td>
              <td>{val.state}</td>
              <td>{val.country}</td>

            </tr>

          ))}
        </tbody>
      </table>
      </div>
      </div>
     
    </div>
   
  );
};

export default ViewWarehouse;