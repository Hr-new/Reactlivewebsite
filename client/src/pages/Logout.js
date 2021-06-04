import React, { Component, useState, useContext, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import Axios from 'axios'
import { Usercontext } from "../App.js"

const Logout=()=> {
    const { state, dispatch } = useContext(Usercontext);
    const history = useHistory()

    useEffect(() => {
        Axios.get("http://localhost:3001/logout").then((res) => {
            if (res) {
                
            
                sessionStorage.removeItem('Id')
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('role')
                sessionStorage.removeItem('Profile_image:')
                localStorage.clear();
                dispatch({ type: "USER", payload: "false" })
                history.push('/Login');
            }


            
        });
    
  
    }, [])
   



    return (
        <div>
            {/* <Redirect to='/Login'></Redirect> */}
        </div>
    )
}
export default Logout;
