import React, { useState, useEffect } from 'react';
import Users from "../components/Users";
import Pagination from "../components/Pagination";

import UpdateUser from "../components/UpdateProduct";
import DeleteUser from "../components/DeleteProduct";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import axios from 'axios';
import '../App.css';

const Display = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:3001/user');
            console.log(res.data)
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <h1>dfgdhg</h1>
        // <Router>
        //     <div className="container">

        //         <nav className="navbar navbar-expand-lg navheader">

        //             <div className="collapse navbar-collapse" >

        //                 <ul className="navbar-nav mr-auto">
                            
        //                     <Link to={'/UpdateUser'} className="nav-link">Update User</Link>
        //                     <Link to={'/DeleteUser'} className="nav-link">Delete User</Link>
        //                 </ul>

        //             </div>

        //         </nav> <br />
        //         <div className='container mt-5'>
 
        //             <Users posts={currentPosts} loading={loading} />
        //             <Pagination
        //                 postsPerPage={postsPerPage}
        //                 totalPosts={posts.length}
        //                 paginate={paginate}
        //             />
        //             <Switch>

                        
        //                 <Route exact path='/UpdateUser' component={UpdateUser} />
        //                 <Route exact path='/DeleteUser' component={DeleteUser} />
        //             </Switch>
        //         </div>
        //     </div>
        // </Router>
    );
};

export default Display;