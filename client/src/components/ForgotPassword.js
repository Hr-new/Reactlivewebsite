
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
            showNullError: false,
        };
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sendEmail = async (e) => {
        e.preventDefault();
        const { email } = this.state;
        if (email === '') {
            this.setState({
                showError: false,
                messageFromServer: '',
                showNullError: true,
            });
        } else {
            try {
                const response = await axios.post(
                    'http://localhost:3001/forgotPassword',
                    {
                        email,
                    },
                );
                console.log(response.data);
                if (response.data === 'recovery email sent') {
                    this.setState({
                        showError: false,
                        messageFromServer: 'recovery email sent',
                        showNullError: false,
                    });
                }
            } catch (error) {
                console.error(error.response.data);
                if (error.response.data === 'email not in db') {
                    this.setState({
                        showError: true,
                        messageFromServer: '',
                        showNullError: false,
                    });
                }
            }
        }
    };

    render() {
        const {
            email, messageFromServer, showNullError, showError
        } = this.state;

        return (
            <div className="content-wrapper" >


                <div className="login" >

                    <form className="profile-form" onSubmit={this.sendEmail}>

                        <input
                            type="text"
                            placeholder="Email Address"

                            onChange={this.handleChange('email')}
                        />

                        <button type='submit' style={{ margin: '15px' }} className='btn btn-primary'> Send Password Reset Email </button>
                    </form>
                    {showNullError && (
                        <div>
                            <p>The email address cannot be null.</p>
                        </div>
                    )}
                    {showError && (
                        <div>
                            <p>
                                That email address isn&apos;t recognized. Please try again or
                                Contact admin.
            </p>


                        </div>
                    )}
                    {messageFromServer === 'recovery email sent' && (
                        <div>
                            <h3>Password Reset Email Successfully Sent!</h3>
                        </div>
                    )}
                    <Link to='/'><button type='submit' className='btn btn-primary'> Go Home </button></Link>


                </div>
            </div>

        );
    }
}

export default ForgotPassword;