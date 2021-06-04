import React, { useState } from "react";

import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function Registration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [roleReg, setroleReg] = useState("");
  const history=useHistory()
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    
    Axios.post("http://localhost:3001/register", {
      name: name,
      age: age,
      country: country,
      username: usernameReg,
      password: passwordReg,
      role: roleReg,
    }).then((response) => {
      console.log(response);
      history.push('/Login')

    });
  };

  // const login = () => {
  //   Axios.post("http://localhost:3001/login", {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setLoginStatus(response.data[0].username);

  //     }
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Role</label>
        <input
          type="text"
          onChange={(e) => {
            setroleReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>

    </div>
  );
}
