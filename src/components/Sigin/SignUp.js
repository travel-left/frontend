import React, { Component } from 'react'
import Slideshow from '../Other/Slideshow'
import './Auth.css'

class SignUp extends Component {
    state = {
        testing: '',
        email: '',
        password: '',
        error: null
    }
    constructor(props) {
        super(props)
        if(this.props.buttonText == 'Sign in') {
            this.setState({testing: 'hello'})
        }

        if(this.props.buttonText == 'Sign up') {
            this.setState({testing: 'hi'})
        }

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props
            .onAuth(this.props.authType, this.state)
            .then(() => {
                return this.props.history.push('/trips')
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err })
            })
    }

    handleSwitch = e => {
        e.preventDefault()
        console.log(e.target.name)
        switch (e.target.name) {
            case 'signin':
                return this.props.history.push('/signup')
            case 'signup':
                return this.props.history.push('/signin')
            default:
                break;
        }
    }

    render() {
        const { email, password, error } = this.state
        let formFields = null

        formFields = (
            <>
            <label htmlFor="first">First Name</label>
            <input className="form-control"type="text" name="first" id="first" placeholder='John'/>
            <label htmlFor="last">Last Name</label>
            <input className="form-control"type="text" name="last" id="last" placeholder='Appleseed'/>
            <label htmlFor="email">Email (will also be your username)</label>
            <input type="text" id="email" name="email" className="form-control" placeholder="Email" value={email} onChange={this.handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" placeholder="Password" value={password} onChange={this.handleChange} />  
            </>
        )
                
        return (
                <div className="row">
                    <div className="col-6" style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="card col-8" style={{marginTop: '5vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', borderRadius: '2%', height: '80%'}} >
                            {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                            <div className="card-body">
                                <div className="card-title">
                                    <h1> {this.props.heading} </h1>
                                    <p>Create your account by filling the form below</p>
                                </div>
                                <form className="signin" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        {formFields}
                                    </div>
                                    <button className="btn btn-lg btn-square dark pull-right" style={{marginTop: '35px'}} type="submit" >{this.props.buttonText}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 sign-in-right" style={{display: 'flex', flexDirection: 'column',  alignItems: 'center'}}>
                        <div style={{marginTop: '30px', paddingLeft: '40px', paddingRight: '40px'}}>
                            <h1 style={{color: '#FBFBFB', fontWeight: 900, fontSize: '140px'}}>left.</h1>
                            <h2 style={{color: '#717171', fontSize: '45px'}}>Do you already have an account?</h2>
                            <p style={{color: '#FBFBFB', letterSpacing: '1px', fontSize: '25px'}}>That's awesome! You can signin by clicking on the button below.</p>
                            <button onClick={this.handleSwitch} name={this.props.switchButtonName} className='btn btn-lg btn-square clear' style={{marginTop: '40px'}}>{this.props.switchButtonText}</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default SignUp
