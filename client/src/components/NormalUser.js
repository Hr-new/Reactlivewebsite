import React, {useState,useEffect}from 'react'
import Login from '../pages/Login'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default function NormalUser() {
    const Id=sessionStorage.getItem('Id')
    const [product, setProduct] = useState('');
    

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await Axios.post("http://localhost:3001/detailuser",{ id: Id });
            // console.log(res.data.TotalProduct)
            setProduct(res.data.TotalProduct)
         };

        fetchPosts();
    }, []);
console.log(product.TotalProduct)
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
                                    <h3>{product.TotalProduct}<sup style={{ fontSize: 20 }}></sup></h3>
                                    <p>Product Available in Warehouse</p>
                                </div>

                                <Link to='/ManageProduct' className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

        </>

    )
}
