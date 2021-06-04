import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import DefaultUserPic from "../uploads/team-male.jpg";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Leftmenu() {
    const [name, setName] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [user_id, setUserId] = useState('');
    const [role, setRole] = useState();
    //alert(sessionStorage.getItem('Profile_image:'))

    if (profileImage) {
        var profilePic = "http://localhost:3001/profile/" + profileImage;
    } else {
        profilePic = DefaultUserPic;
    }

    Axios.defaults.withCredentials = true;
    
    useEffect(() => {
        const interval = setInterval(() => {
           setProfileImage(sessionStorage.getItem('Profile_image:'))
            setName(sessionStorage.getItem('user'))
            setRole(sessionStorage.getItem('role'))

        }, );
        return () => clearInterval(interval);
       
    }, []);
    
    if (role == 'admin') {
        return (
            <div>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4" >
                    {/* Brand Logo */}
                    {/* <a href="#" className="brand-link">
                <img src={profilePic} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">{this.state.name}</span>
            </a> */}
                    {/* Sidebar */}
                    <div className="sidebar" >
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={profilePic} className="img-circle elevation-3" style={{ width: '2.7rem', height: '50px' }} alt="User Image" />
                            </div>
                            <div className="info">
                                <NavLink to='/profile' className="nav-link">{name}</NavLink>
                            </div>
                        </div>

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li className="nav-item d-none d-sm-inline-block">
                                <i class="bi bi-kanban"></i>
                                    <NavLink to="/Manageuser" className="nav-link">
                                    Manage User
                                    
                                    </NavLink>
                                    
                                </li>
                                <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to="/AddUser" className="nav-link">Add USer</NavLink>
                                </li>

                                <li class="nav-item d-none d-sm-inline-block">
                                
                                    <a  class="nav-link">
                                   
                                        Product
                                        <p>
                                            <i class=" right fas fa-angle-left "></i>
                                        </p>    

                                    </a>
                                    <ul class="nav nav-treeview" >
                                        <li class="nav-item">
                                            <NavLink to='/Product' className="nav-link" >
                                                Manage Product
                                                </NavLink>
                                        </li>
                                        <li class="nav-item">
                                            <NavLink to='/AddProduct' className="nav-link" >
                                                Add Product
                                                </NavLink>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to="/Request" className="nav-link">Manage Request</NavLink>
                                </li>

                                <li class="nav-item d-none d-sm-inline-block">
                                    <a  class="nav-link">

                                        Stock
                                        <p> <i class="right fas fa-angle-left"></i></p>
                                           

                                    </a>
                                    <ul class="nav nav-treeview" >
                                        <li class="nav-item">
                                            <NavLink to='/ViewStock' className="nav-link" >
                                                View Stock
                                                </NavLink>
                                        </li>
                                        <li class="nav-item">
                                            <NavLink to='/WarehouseStock' className="nav-link" >
                                                Warehouse Stock
                                                </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>

            </div>
        )
    }
    else if (role == 'Visitor') {
        return (
            <div >
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4" >
                    {/* Brand Logo */}
                    {/* <a href="#" className="brand-link">
                    <img src={profilePic} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">{this.state.name}</span>
                </a> */}
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={profilePic} className="img-circle elevation-3" style={{ width: '2.7rem', height: '50px' }} alt="User Image" />
                            </div>
                            <div className="info">
                                <NavLink to='/profile' className="nav-link">{name}</NavLink>
                            </div>
                        </div>

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to="/ManageProduct" className="nav-link">Manage Product</NavLink>
                                    
                                </li>
                               <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to='/AddStock' className="nav-link">AddStock</NavLink>
                                </li>
                                <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to='/ReduceStock' className="nav-link">ReduceStock</NavLink>
                                </li>
                                <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to='/ViewWarehouse' className="nav-link">ViewWarehouse</NavLink>
                                </li>
                                <li className="nav-item d-none d-sm-inline-block">
                                    <NavLink to='/RequestStock' className="nav-link">RequestStock</NavLink>
                                </li>

                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>

            </div>
        )
    }
    
    else {
        return (
            <div>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    {/* <a href="#" className="brand-link">
                    <img src={profilePic} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">{this.state.name}</span>
                </a> */}
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={profilePic} className="img-circle elevation-3" style={{ width: '2.7rem', height: '50px' }} alt="User Image" />
                            </div>
                            <div className="info">
                                <NavLink to='/profile' className="nav-link">{name}</NavLink>
                            </div>
                        </div>

                    </div>
                    {/* /.sidebar */}
                </aside>

            </div>)
    }
}



