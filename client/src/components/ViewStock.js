import React, { useState, useEffect } from 'react';
import Stocks from "../components/Stocks";
import Pagination from "../components/Pagination";
import WarehouseStock from "../components/WarehouseStock";
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from "react-router-dom";


import Axios from "axios";
import '../App.css';

const ViewStock = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const history = useHistory();

    useEffect(() => {
        const fetchPosts = async () => {
            
            const res = await Axios.get('http://localhost:3001/viewstock');
            console.log(res.data)
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
        <Router>
            <div className="content-wrapper">
            <div className="container">
                <div className='container mt-5'>
              
                   <Stocks posts={currentPosts} loading={loading} />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                   
                    <Switch>

                        <Route exact path='/WarehouseStock' component={WarehouseStock} />

                        {/* <Route exact path='/Login' component={Login} /> */}
                    </Switch>
                </div>
            </div>
            </div>
        </Router>
    );
};

export default ViewStock;