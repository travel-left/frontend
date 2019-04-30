import React from 'react'
import AuthForm from './AuthForm'

const Homepage = ({ currentUser }) => {
    if(!currentUser.isAuthenticated){
        return (
            <div>
                <ul class="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <AuthForm/>
            </div>

        )
    }else {
        return <h1>hello from the homepage</h1>
    }
}

export default Homepage