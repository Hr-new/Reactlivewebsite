import React, { useEffect, useState,useContext } from "react";
import { useHistory,Link } from 'react-router-dom';
import Axios from "axios";
import {Usercontext} from "../App.js"
import "../App.css";


export default function Login() {
    const {state,dispatch} = useContext(Usercontext);

    // cookies.Expires = DateTime.Now.AddDays(-1);
    // console.log(jwttoken)
    
    // window.location.reload();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const history = useHistory();
    const handleSeachInputKeyPress = event => {
        if (event.key === 'Enter') {
           
        //   console.log('Enter key pressed! Search Value: ' + event.target.value);
          login()
        }

      }

    
    const login = (e) => {
        // e.preventDefault();
        // console.log('welcom')
        // const a = sessionStorage.getItem('Id')
       


        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
                // alert(response.data.message)
            } else {
                if (response.data[0].username) {
                    setLoginStatus(response.data[0].username);
                    dispatch({type:"USER",payload:"true"})
                    sessionStorage.setItem('user', response.data[0].name)
                    sessionStorage.setItem('Profile_image:',response.data[0].Profile_image)
                    sessionStorage.setItem('Id', response.data[0].userId)
                    sessionStorage.setItem("role",response.data[0].role)
                    history.push('/Main');
                }

            }

        });

    };

    return (
        <div className="content-wrapper">
        <div className="App">
           
            <div className="login">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onKeyPress={handleSeachInputKeyPress}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    style={{marginTop: '10px'}}
                />

                <button type='submit' onClick={login} style={{marginTop: '10px'}} className='btn btn-primary'> Login </button>
                <Link style={{marginLeft: '200px',textDecoration:'none'}} to='/ForgotPassword'>ForgotPassword</Link>
                            
            </div>

            <h1>{loginStatus}</h1>
            
        </div>
        </div>
    );
}