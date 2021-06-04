import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

const Navigation = () => {
    const [user_id, setUserId] = useState();
    const [role, setRole] = useState();
    // const [status,setStatus]=useState();

    // window.location.reload();
    useEffect(() => {
        const interval = setInterval(() => {
            setUserId(sessionStorage.getItem('Id'))
            setRole(sessionStorage.getItem('role'))
           // setStatus(statusa)
        }, 1);
        return () => clearInterval(interval);
    }, []);

    const status = user_id ? "Logout" : "Login"
    let path;
    if(status==="Login")
        path="/Login"
    else
        path="/Logout"    
    // alert(path)
  
        return (
            <div>
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <NavLink to="/Main" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <NavLink to='/profile' className="nav-link">Profile</NavLink>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <NavLink to={path} className="nav-link">{status}</NavLink>
                        </li>


                    </ul>
                    {/* Right navbar links */}

                </nav>
                {/* /.navbar */}

            </div>
        )
   
}
export default Navigation;