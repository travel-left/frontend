import React from 'react'
import './Auth.css'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

export default function sidePicture({ type, onClick }) {
    const { header, body, button } =
        type === 'sign in' ? signInText : signUpText
    return (
        <div style={{
            minHeight: 600,
            height: 'calc(100vh - 80px)', backgroundPosition: 'center',
            backgroundSize: 'cover', objectFit: 'cover'
        }}>
            <div className="bg-image" />
            <div className="container px-5 right text-left">
                <Typography variant="h4" gutterBottom>
                    {header}
                </Typography>
                <h2 className="Auth-side-message">{body}</h2>
                <Button variant="contained" color="secondary" disableRipple style={{ height: 50, width: 180 }} onClick={onClick} name={type}>
                    {button}
                </Button>
            </div>
        </div>
    )
}

const signUpText = {
    header: 'Do you already have an account?',
    body: "That's awesome!  You can login by clicking on the button below.",
    button: 'Sign in'
}

const signInText = {
    header: "Don't have an account?",
    body: 'No problem!  You can make one by clicking on the button below.',
    button: 'Sign up'
}
