import React, { Component } from 'react'

export default class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state).then(() => {
            this.setState({
                email: '',
                password: ''
            })
        })
    }

    render() {
        const { error } = this.props
        const { email, password } = this.state

        return (
            <div className="card col-10 shadow align-self-start my-5">
                {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                <div className="card-body p-4">
                    <h1 className="heading">Sign In.</h1>
                    <h5 className="text-dark">Sign in to your account.</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mt-5">
                            <label htmlFor="email" className="text-dark">
                                Email
                            </label>
                            <input type="text" id="email" name="email" className="form-control border-top-0 border-left-0 border-right-0 form-control-lg" placeholder="steve@apple.com" value={email} onChange={this.handleChange} />
                            <label htmlFor="password" className="text-dark mt-3">
                                Password
                            </label>
                            <input type="password" id="password" name="password" className="form-control form-control-lg border-top-0 border-left-0 border-right-0" placeholder="••••••••••••" value={password} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-lg btn-primary float-right" style={{ marginTop: '35px' }} type="submit">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
