import React, { Component } from "react"
import Slideshow from '../Other/Slideshow'

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
        this.props.onAuth(authType, this.state)
        .then(() => {
            return this.props.history.push('/trips')
        })
        .catch(err => {
            console.log(err)
            this.setState({error: err})
        })
    }

    render (){
        const { email, password, error } = this.state
        return (
            <div className="container">
                <Slideshow></Slideshow>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-10 col-md-6 col-lg-4 col-xl-3 authform">
                        <img className="mx-auto d-block" src="./logo.png" alt=""/>
                        <h1 id='landing-header'>Sign in to explore and connect with the your cohort.</h1>
                        { error ? <p style={{color: 'red'}}>{error.message}</p> : null}
                        <form className="signin" onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <label htmlFor="email"></label>
                                <input type="text" id="email" name="email"  className="form-control" placeholder="Email" value={email} onChange={this.handleChange}/>
                                <label htmlFor="password"></label>
                                <input type="password" id="password" name="password"className="form-control" placeholder="Password" value={password} onChange={this.handleChange}/>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col" >
                                            <a href="/" style={{color: '#82ccdd'}}> <strong>GET THE APP</strong></a>                                        
                                            <a href="/" style={{color: '#82ccdd'}}> <strong>FORGOT PASSWORD</strong> </a>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-block btn-lg" type="submit" style={{backgroundColor: '#3c6382', color: 'white'}}>SIGN IN</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm