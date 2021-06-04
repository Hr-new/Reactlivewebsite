import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import Login from '../pages/Login'



export default function Admin() {
    const [request, setRequest] = useState('');
    const [users, setUsers] = useState('');
    const [product, setProduct] = useState('');
    // const [posts, setPosts] = useState([0]);
    const Id=sessionStorage.getItem('Id')
    const history=useHistory();
    
    if (!Id) {
        history.push('/login')
    }

    useEffect(() => {

        const fetchPosts = async () => {

            const res = await Axios.get("http://localhost:3001/detail",);
            setProduct(res.data.TotalProduct)
            setUsers(res.data.TotalUSer)
            setRequest(res.data.TotalRequest)
        };

        fetchPosts();
    }, []);

    return (

        <>

            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div>

                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{request.TotalRequest}</h3>
                                    <p>New Request</p>
                                </div>

                                <Link to='/Request' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>{product.TotalProduct}<sup style={{ fontSize: 20 }}></sup></h3>
                                    <p>Available Product</p>
                                </div>

                                <Link to='/Product' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{users.TotalUser}</h3>
                                    <p>Register User</p>
                                </div>

                                <Link to='/ManageUSer' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>


                    </div>

                </div>
            </section>

        </>

    )
}
