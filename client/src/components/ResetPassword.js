/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom'




const loading = {
    margin: '1em',
    fontSize: '24px',
};



export default class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            cpassword:'',
            updated: false,
            isLoading: true,
            error: false,
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { token },
            },
        } = this.props;
        try {
            const response = await axios.get('http://localhost:3001/reset', {
                params: {
                    resetPasswordToken: token,
                },
            });
            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
                this.setState({
                    username: response.data.username,
                    updated: false,
                    isLoading: false,
                    error: false,
                });
            }
        } catch (error) {
            // console.log(error.response.data);
            this.setState({
                updated: false,
                isLoading: false,
                error: true,
            });
        }
    }
    
    
    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updatePassword = async (e) => {
        e.preventDefault();
        const { username, password,cpassword } = this.state;
        if(password!=cpassword){
            alert('Password and Confirm Password Must be same')
        }
        else{
        const {
            match: {
                params: { token },
            },
        } = this.props;
        try {
            const response = await axios.put(
                'http://localhost:3001/updatePasswordViaEmail',
                {
                    username,
                    password,
                    resetPasswordToken: token,
                },
            );
            console.log(response.data);
            if (response.data.message === 'password updated') {
                this.setState({
                    updated: true,
                    error: false,
                });
            } else {
                this.setState({
                    updated: false,
                    error: true,
                });
            }
        } catch (error) {
            // console.log(error.response.data);
        }
    }
    };

    render() {
        const {
            password, error, isLoading, updated,cpassword
        } = this.state;
        // alert(error)
        if (error) {
            return (
                <div className="content-wrapper" >

                    <div style={loading}>
                        <h4>Problem resetting password. Please send another reset link.</h4>
                        <Link to='/'><button type='submit' className='btn btn-primary'> Go Home </button></Link>
                        <Link to='/forgotPassword'><button type='submit' className='btn btn-primary' style={{ marginLeft: '15px' }}> Forgot Password? </button></Link>

                    </div>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div className="content-wrapper" >

                    <div style={loading}>Loading User Data...</div>
                </div>
            );
        }
        return (
            <div className="content-wrapper" >
                 
                <div className="login" >

                <form className="password-form" style={{marginTop: '100px'}} onSubmit={this.updatePassword}>
                <input
                            type="password"
                            placeholder="Newspassword"
                            value={password}
                            id="password"
                            label="password"
                            onChange={this.handleChange('password')}
                /><br/>
                <input
                    type="password"
                    placeholder="Confirm Password..."
                    value={cpassword}
                    id="cpassword"
                    label="cpassword"
                    onChange={this.handleChange('cpassword')}
                    style={{marginTop: '10px'}}
                /><br/>
                <button type='submit' style={{ marginTop: '15px', marginBottom:'15px' }} className='btn btn-primary'> Update Password </button>

                </form>

                {updated && (
                    <div>
                        <p><h4> Your password has been successfully reset, please try logging in again.</h4></p>
            <Link to='/login'><button type='submit' style={{ marginLeft: '219px', marginBottom:'15px' }}  className='btn btn-primary'> Login </button></Link>

                    </div>
                )}
                <Link to='/'><button type='submit' className='btn btn-primary'> Go Home </button></Link>
                </div>
                </div>
            
        );
    }
}

ResetPassword.propTypes = {
    // eslint-disable-next-line react/require-default-props
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    }),
};
