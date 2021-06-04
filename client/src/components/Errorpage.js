import React from 'react'
import {NavLink} from 'react-router-dom'

function Errorpage() {
    return (
        <div className="content-wrapper">
            <div className="users" >
                <h1 className="mt-5">404</h1>
                <h1 className="mt-1">We are sorry, Page Not Found!</h1>
                <p className='my-4'>
                    The page You are looking might have been Removed/Temporary Unavailable 
                </p>
                 
                <NavLink to='/'><button class="btn btn-primary" >Back to Home</button></NavLink>
            </div>
        </div>
    )
}

export default Errorpage
