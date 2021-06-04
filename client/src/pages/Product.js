import React, { useState, useEffect } from 'react';
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";

import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";
import Login from "./Login";

import Axios from "axios";
import '../App.css';

const Product = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const history = useHistory();
    const a = sessionStorage.getItem('Id')
    if (!a) {
        history.push('/login')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await Axios.get('http://localhost:3001/product');
            // console.log(res.data)
            setPosts(res.data);
            
            setLoading(false);
        };

        fetchPosts();
    }, []);
    
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
              
                <div className='container mt-5'>


                    <Posts posts={currentPosts} loading={loading} />
                    
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

export default Product;