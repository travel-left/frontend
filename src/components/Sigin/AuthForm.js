import React, { Component } from 'react'
import Slideshow from '../Other/Slideshow'
import './Auth.css'

class AuthForm extends Component {
    state = {
        email: '',
        password: '',
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
        const authType = this.props.signUp ? 'signup' : 'signin'
        this.props
            .onAuth(authType, this.state)
            .then(() => {
                return this.props.history.push('/trips')
            })
            .catch(err => {
                console.log(err)
                this.setState({ error: err })
            })
    }

    render() {
        const { email, password, error } = this.state
        return (
            <div className="container-fluid" style={{height: '100vh'}}>
                <div className="row">
                    <div className="col-6" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                        <div className="card col-8" style={{marginTop: '5vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', borderRadius: '2%'}} >
                            {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                            <div className="card-body">
                                <div className="card-title">
                                    <h1> Start your Free Trial </h1>
                                    <p>Create your account by filling the form below</p>
                                </div>
                                <form className="signin" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <label htmlFor="first">First Name</label>
                                        <input className="form-control"type="text" name="first" id="first" placeholder='John'/>
                                        <label htmlFor="last">Last Name</label>
                                        <input className="form-control"type="text" name="last" id="last" placeholder='Appleseed'/>
                                        <label htmlFor="email">Email (will also be your username)</label>
                                        <input type="text" id="email" name="email" className="form-control" placeholder="Email" value={email} onChange={this.handleChange} />
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" className="form-control" placeholder="Password" value={password} onChange={this.handleChange} />  
                                    </div>
                                    <button className="btn btn-lg btn-square dark pull-right" type="submit" >SIGN UP</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm
