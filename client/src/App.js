import React, { Component, createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import Product from "./pages/Product";
import Request from "./pages/Request";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import ViewWarehouse from "./components/ViewWarehouse";
import WarehouseStock from "./components/WarehouseStock";
import ViewStock from "./components/ViewStock";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import AddUser from "./components/AddUser";
import ManageUser from "./components/ManageUser";
import ManageProduct from "./components/ManageProduct";
import AddStock from "./components/AddStock";
import ReduceStock from "./components/DeleteStock";
import RequestStock from "./components/RequestStock";
import Posts from "./components/Posts";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Error from "./components/Errorpage";
import Logout from "./pages/Logout";
import "./App.css";





import Login from "./pages/Login";


import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Leftmenu from "./components/Leftmenu";
import Footer from "./components/Footer";
import Content from "./components/Content";
import {initialState,reducer} from "../src/reducer/UseReducer";

export const Usercontext=createContext();
function App() {
 
const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
     <Usercontext.Provider value={{state,dispatch}}>
        <Navigation />
        <Leftmenu />
        <Switch>
          <Route exact path='/' component={Content} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Posts' component={Posts} />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/Product" component={Product} />
          <Route exact path="/WarehouseStock" component={WarehouseStock} />
          <Route exact path="/ViewWarehouse" component={ViewWarehouse} />
          <Route exact path="/Request" component={Request} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/ViewStock" component={ViewStock} />
          <Route exact path="/Reset" component={Reset} />
          <Route exact path='/AddUser' component={AddUser} />
          <Route exact path='/ManageUser' component={ManageUser} />
          <Route exact path='/ManageProduct' component={ManageProduct} />
          <Route exact path='/ViewWarehouse' component={ViewWarehouse} />
          <Route exact path='/AddStock' component={AddStock} />
          <Route exact path='/ReduceStock' component={ReduceStock} />
          <Route exact path='/RequestStock' component={RequestStock} />
          <Route exact path='/AddProduct' component={AddProduct} />
          <Route exact path='/UpdateProduct' component={UpdateProduct} />
          <Route exact path='/DeleteProduct' component={DeleteProduct} />
          <Route exact path='/ForgotPassword' component={ForgotPassword} />
          <Route exact path='/reset/:token' component={ResetPassword} />
          <Route exact path='/Logout' component={Logout} />
          <Route component={Error} />
        </Switch>
       
      <Footer />
      </Usercontext.Provider>
    </>
  );
}
export default App;


