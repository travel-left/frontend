import React from 'react'
import './Auth.css'

export default function sidePicture({ type, onClick }) {
    const { header, body, button } = type === 'sign in' ? signInText : signUpText
    return (
        <div style={{ height: '100%', minHeight: '90vh' }}>
            <div className="bg-image" />
            <div className="container px-5 right text-left">
                <h2 className="display-1 text-light font-weight-bold">left.</h2>
                <h2 className="h1 text-secondary font-weight-bold">{header}</h2>
                <h2 className="h4 text-light font-weight-light">{body}</h2>
                <button onClick={onClick} name={type} className="btn btn-lg btn-outline-light my-5">
                    {button}
                </button>
            </div>
        </div>
    )
}

const signUpText = {
    header: 'Already have an account?',
    body: "That's awesome!  You can login by clicking on the button below.",
    button: 'Log in'
}

const signInText = {
    header: "Don't have an account?",
    body: 'No problem!  You can make one by clicking on the button below.',
    button: 'Sign up'
}
