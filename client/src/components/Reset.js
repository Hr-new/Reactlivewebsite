import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import "../App.css";


export default function Reset() {

    const [confirmpassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");


    const history = useHistory();
    const a = sessionStorage.getItem('Id')
    if (!a) {
        history.push('/login')
    }

    const login = () => {
        // alert(a)
        if(password!=confirmpassword){
            alert('Password and Confirm Password Must be same')
        }
        else{ Axios.post("http://localhost:3001/Resetpassword", {
            userid: a,
            // confirmpassword: confirmpassword,
            password: password,
        }).then((response) => {
            console.log("Password Change Successfully")

            history.push('/Main')

        }).catch(err => console.log(err))}
       


    };


    return (
        <div className="content-wrapper" >
        <div className="App">
            <div className="login">
                <h1>Change Password</h1>
                <input
                    type="text"
                    placeholder="password..."
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Confirm Password..."
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />

                <button onClick={login}  className='btn btn-primary'> Submit </button>

            </div>

            </div>
        </div>
    );
}