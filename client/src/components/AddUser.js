import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import Select from 'react-select'

import "../App.css";


export default function Adduser() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [roleReg, setroleReg] = useState("");
    const [email, setemail] = useState("");
    const [userList, setUserList] = useState([]);

    const options = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Visitor', label: 'Visitor' },

    ]

    Axios.defaults.withCredentials = true;
    const history = useHistory();
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn !== true) {
                history.push('/Login')

            }

        });
    }, []);

    const register = async () => {
        //  alert(name)
        if (name != '' && age != '' && country != '' && usernameReg != '' && passwordReg != '' && roleReg != '' && email != '') 
        {
            try{
            const response = await Axios.post("http://localhost:3001/register", {
                name: name,
                age: age,
                country: country,
                username: usernameReg,
                password: passwordReg,
                role: roleReg,
                email: email,
            });
            if (response.data.message === 'Duplicate Email') {
                alert('Email Already Register')

            } else {
                setUserList([
                    ...userList,
                    {
                        name: name,
                        age: age,
                        country: country,
                        username: usernameReg,
                        password: passwordReg,
                        role: roleReg,
                        email: email,
                    },
                ]);
            }
            } catch (error) {
                // console.log(error.response.data);
            }
           history.push('/Main')
        }
        else { alert('Please Fill All the Value') }


    };



    return (
        <div className="content-wrapper">
            <div className="App">

                <div className="users">
                    <h1>Add USer</h1>
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
                    <label>Email:</label>
                    <input
                        type="text"
                        onChange={(event) => {
                            setemail(event.target.value);
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
                    <div style={{ width: '320px' }}>
                        <Select options={options} onChange={(e) => {
                            setroleReg(e.value);
                        }} />
                    </div>
                    <br />
                    {/* <input
                    type="text"
                    onChange={(e) => {
                        setroleReg(e.target.value);
                    }}
                /> */}
                    <button class="btn btn-primary" onClick={register}> Add user </button>
                </div>
                {/* <br />
            <button onClick={done}> Done </button> */}
            </div>

        </div>



    );
}
