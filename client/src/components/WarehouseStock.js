import React, { useState, useEffect } from 'react';
import Stocks from "../components/Stocks";
import Pagination from "../components/Pagination";


import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";


import Axios from "axios";
import '../App.css';
import Select from 'react-select';

const WarehouseStock = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const history = useHistory();
    const[warehousename,setwarehouseName]=useState();
    const options=[
        {value:'ABC',label:'ABC'},
        {value:'xyz',label:'XYZ'},
        {value:'HIT',label:'HIT'}
    ]

    const register=()=>{
        // alert(warehousename)
        Axios.post("http://localhost:3001/WarehouseStock",{warehousename:warehousename}).then((response) => {
            setPosts(response.data);
            setLoading(false);
            console.log(response.data)     
    });
        
 
    };

    

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn !== true) {
                history.push('/Login')

            }

        });
    }, []);
   
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className="content-wrapper">
        <div className="container">

            <nav className="navbar navbar-expand-lg navheader">

                <div className="collapse navbar-collapse" >
                <div style={{width: '320px'}}>
                  <Select options={options} onChange={(e)=>{setwarehouseName(e.value)}}/>  

             </div>
             
                <button className='btn btn-primary' style={{marginLeft:'10px'}}onClick={register} > View </button>     
                  
                

                </div>

            </nav> <br />
            <div className='container mt-5'>


                <Stocks posts={currentPosts} loading={loading} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
              
              </div>
            
        </div>
        </div>
    );
};

export default WarehouseStock;