import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Axios from "axios";
import { Link } from 'react-router-dom'
import{usehistory} from 'react-router-dom'
import DefaultUserPic from "../uploads/team-male.jpg";
class Profile extends Component {

    constructor(props) {
        
        super(props);
        const { history } = this.props
        const a = sessionStorage.getItem('Id')
        // if (!a) {
        //     history.push('/Login')
        // }

        this.state = {
            user_id: this.props.user_id,
            name: this.props.name,
            age: this.props.age,
            country: this.props.country,
            profileImage:this.props.profileImage,
            uploadedFile:null
            // password:this.props.password

        }
    }
    fetchUserDetails=async (user_id)=>{
        
        const { history } = this.props
        try{
            
            const res=await Axios.post("http://localhost:3001/profile",{ id: user_id,withCredentials: true });
            // console.log(res.data)
            const data =await res.data;
            // console.log(data.userId);
            if(!res.data===200)
            {
                const error=new Error(res.error)
                throw error;
                // history.push('/Login')
            }
            else{
                this.setState({ name: res.data[0].name });
                this.setState({ age: res.data[0].age })
                this.setState({ country: res.data[0].country })
                this.setState({profileImage:res.data[0].Profile_image})
            }
            
        }
        catch(err){
            // console.log(err);
            history.push('/Login')
        }

    }



   

    // check=async ()=>{
    //     const { history } = this.props
    //     try{
            
    //         const res=await Axios.get("http://localhost:3001/profilejwt",{ withCredentials: true });
    //         // console.log(res.data)
    //         const data =await res.data;
    //         // console.log(data.userId);
    //         if(!res.data===200)
    //         {
    //             const error=new Error(res.error)
    //             throw error;
    //             // history.push('/Login')
    //         }
    //         else{
    //             //this.fetchUserDetails(user_id);
    //         }
            
    //     }
    //     catch(err){
    //         // console.log(err);
    //         history.push('/Login')
    //     }

    // }

    componentDidMount() {
        const user_id = sessionStorage.getItem('Id')     
        this.fetchUserDetails(user_id);

    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }


    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        const { history } = this.props
        //create object of form data
        const user_id = sessionStorage.getItem('Id')
        const formData=new FormData();
        formData.append("profile",this.state.uploadedFile);
        formData.append("name",this.state.name);
        formData.append("age",this.state.age);
        formData.append("country",this.state.country);
        formData.append("user_id",user_id);

        //update-profile
        Axios.post("http://localhost:3001/upload",formData).then(res=>{
            
            if(res.data.message)
                     alert(res.data.message+' Select Small size file')
            else
                
            this.setState({profileImage:res.data});
           
        })
        .catch(err=>console.log(err))
        history.push('/Main')
    }

    render() {
        if(this.state.profileImage){
            var imagestr=this.state.profileImage;
            // console.log(imagestr)
            
            // imagestr = imagestr.replace("public/", "");
            var profilePic="http://localhost:3001/profile/"+imagestr;
        }else{
             profilePic=DefaultUserPic;
        }


        return (
            <div className="content-wrapper" >
                
            <Container>
                <Row>
                    <Col style={{marginTop: '50px',marginLeft:'50px'}} >
                        <img src={profilePic} alt="profils pic" height="400px" width="400px"/>
                    </Col>
                    <Col style={{marginTop: '50px'}} >
                        <h1>User Profile</h1>
                        <Form className="form">

                            <Form.Group controlId="formCategory1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }); }} />

                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="name" defaultValue={this.state.age} onChange={(event) => { this.setState({ age: event.target.value }); }} />

                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="name" defaultValue={this.state.country} onChange={(event) => { this.setState({ country: event.target.value }); }} />

                            </Form.Group>
                            <Form.Group controlId="formCategory4">
                                <Form.Label>Profile Image</Form.Label><br/>
                                <Form.Control type="file" name="profile" onChange={this.changeProfileImage} />
                            </Form.Group>
                            <Button variant="primary" onClick={this.UpdateProfileHandler}  >Update Profile</Button>
                            <Link style={{marginLeft: '200px',textDecoration:'none'}} to='/Reset'>Change Password</Link>
                            

                        </Form>
                    </Col>

                </Row>
            </Container>
            </div>
        )
    }

}


export default Profile;