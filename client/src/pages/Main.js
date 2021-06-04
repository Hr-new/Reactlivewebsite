import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { useHistory } from 'react-router-dom';


import NormalUser from "../components/NormalUser";

import Admin from "../components/Admin";
import { useHistory, Link, Riderct } from 'react-router-dom';

export default function Main() {
  

  const [role, setRole] = useState("");

  const history = useHistory();
  // const a = sessionStorage.getItem('Id')
  // if (!a) {
  //   history.push('/Login')
  // }


  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response.data)
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].role);
        
      
      }
      else {
        history.push('/Login')
      }

    });
    
  }, []);
  // if(!authorized){return <Redirect to="/Login" />;}
  return (
    <div className="content-wrapper">
    <div>

      {role === "admin" && <Admin />}
      {role === "Visitor" && <NormalUser />}

    </div>
    </div>
  );
}
