import React, { Component } from 'react'
import './Auth.css'

class Auth extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        error: null
    }
    constructor(props) {
        super(props)

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props
            .onAuth(this.props.type.split(' ').join(''), this.state)
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
        switch (e.target.name) {
            case 'sign in':
                return this.props.history.push('/signup')
            case 'sign up':
                return this.props.history.push('/signin')
            default:
                break
        }
    }

    render() {
        let {type} = this.props
        let heading, subHeading, signupFields, footer, opposite = null

        if(type === 'sign in') {
            heading = 'Sign in below'
            footer = "Don't have an account?"
            opposite = 'Sign Up'
        }else if(type === 'sign up'){
            heading = 'Start your Free Trial'
            subHeading = 'Create your account by filling out the form below.'
            footer = 'Already have an account?'
            opposite = 'Sign In'
            signupFields = (
                <>
                    <label htmlFor="firstName" className="d-none">First Name</label>
                    <input className="form-control form-control-lg" type="text" name="firstName" id="firstName" placeholder="First" value={firstName} onChange={this.handleChange} />
                    <label htmlFor="lastName" className="d-none">Last Name</label>
                    <input className="form-control form-control-lg" type="text" name="lastName" id="lastName" placeholder="Last" value={lastName} onChange={this.handleChange} />
                </>
            )
        }

        let { firstName, lastName, email, password, error } = this.state

        return (
            <div className="row no-gutters">
                <div className="col-md-12 col-lg-6 d-flex justify-content-center my-5">
                    <div className="card col-10 shadow">
                        {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                        <div className="card-body p-4">
                            <div className="heading text-center">
                                <h1> {heading} </h1>
                                <h5 className="text-secondary">{subHeading}</h5>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group mt-4">
                                    {signupFields}
                                    <label htmlFor="email" className="d-none">Email (your username)</label>
                                    <input type="text" id="email" name="email" className="form-control form-control-lg" placeholder="steve@apple.com" value={email} onChange={this.handleChange} />
                                    <label htmlFor="password" className="d-none">Password</label>
                                    <input type="password" id="password" name="password" className="form-control form-control-lg" placeholder="••••••••••••" value={password} onChange={this.handleChange} />
                                    <small className='text-muted'>Password must be at least 8 characters.</small>    
                                </div>
                                <button onClick={this.handleSubmit} className="btn btn-lg btn-square dark btn-block" style={{ marginTop: '35px' }} type="submit">
                                    {type}
                                </button>
                            </form>
                            <div className="footer text-center mt-2">
                                <small className='text-muted text-center'>{footer} <a class='text-primary' href='' onClick={this.handleSwitch} name={type}>{opposite}</a></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 auth-right d-none d-md-block" style={{height: '100vh'}}>
                    <div class="bg-image"></div>
                    <div className="container px-5 right">
                        <h2 className="display-4 text-light">The easiest way to coordinate group travel.</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth
