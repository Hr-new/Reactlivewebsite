import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";

import "../App.css";


export default function ManageUser() {
    const [newname, setNewName] = useState("");
    const [newage, setNewAge] = useState(0);
    const [newcountry, setNewCountry] = useState("");
    const [newusername, setNewUsername] = useState("");
    const [newrole, setNewRole] = useState(0);
    const [warehouseId, setwarehouseId] = useState("");
    const [id, setId] = useState("");
   
  
    const [userList, setUserList] = useState([]);
  
    Axios.defaults.withCredentials = true;
    const history=useHistory();
    const a=sessionStorage.getItem('Id')
    if (!a)
    {
      history.push('/login')
    }

    const AssignWarehouse = (id) => {
        // alert(warehouseId)
        Axios.put("http://localhost:3001/warehouse", { warehouseId: warehouseId, id: id }).then(
          (response) => {
            setUserList(
              userList.map((val) => {
                return val.id == id
                  ? {
                    id: val.id,
                    warehouseId: warehouseId
                 }
                  : val;
              })
    
            );
            // history.push('/Login');
          }
        );
        history.push('/Main')
      };
    
      const updateUserRole = (id) => {
        // alert(newrole)
        Axios.put("http://localhost:3001/update", { name: newname, age: newage, country: newcountry, username: newusername, role: newrole, id: id }).then(
          (response) => {
            setUserList(
              userList.map((val) => {
                return val.id == id
                  ? {
                    id: val.id,
                    name: newname,
                    age: newage,
                    country: newcountry,
                    username: newusername,
                    
                    role: newrole
                  }
                  : val;
              })
    
            );
            // history.push('/Login');
          }
        );
        history.push('/Main')
      };
      
    
 
    
     
     


        return (
          <div className="content-wrapper">
          
            <div className="information">
            
            <label>UserId:</label>
              <input
                type="text"
                placeholder="NewName"
                onChange={(event) => {
                  setId(event.target.value);
                  
                }}
              />
            
            <label>Name:</label>
              <input
                type="text"
                placeholder="NewName"
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              
              <label>Age:</label>
              <input
                type="text"
                placeholder="NewAge"
                onChange={(event) => {
                  setNewAge(event.target.value);
                }}
              />
              
              <label>Country:</label>
              <input
                type="text"
                placeholder="NewCountry"
                onChange={(event) => {
                  setNewCountry(event.target.value);
                }}
              />
              
              <label>UserName:</label>
              <input
                type="text"
                placeholder="NewUsername"
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
             
              <label>Role:</label>
              <input
                type="text"
                placeholder="NewRole"
                onChange={(event) => {
                  setNewRole(event.target.value);
                }}
              />
              
              <label>WarehouseName:</label>
              <input
                type="text"
                placeholder="WarehouseName"
                onChange={(event) => {
                  setwarehouseId(event.target.value);
                }}
              />
              
              <button
                  onClick={() => {
                    updateUserRole(id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    AssignWarehouse(id);
                  }}
                >
                  AssignWarehouse
                </button>
               
            </div>
            
            </div>
          
        );
      
  
  
}
