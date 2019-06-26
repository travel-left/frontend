import React, { Component } from 'react'

export default class SignUp extends Component {
    state = {
        error: null,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        orgId: '',
        createOrg: false
    }

    handleChange = e => {
        if (e.target.name === 'createOrg') {
            const { createOrg } = this.state
            this.setState({
                createOrg: !createOrg
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { password, confirmPassword } = this.state
        if (password === confirmPassword) {
            this.props.submit(this.state).then(() => {
                this.setState({
                    error: null,
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    orgId: '',
                    createOrg: false
                })
            })
        } else {
            this.setState({
                error: 'Passwords do not match.',
                confirmPassword: ''
            })
        }
    }

    render() {
        const { error } = this.state || this.props
        const { name, email, password, confirmPassword, createOrg, orgId } = this.state

        const orgIdForm = !createOrg ? (
            <>
                <label htmlFor="orgId" className="text-dark mt-3">
                    Organization ID (this is given by your organization's administrator)
                </label>
                <input type="text" id="orgId" name="orgId" className="form-control form-control-lg border-top-0 border-left-0 border-right-0" placeholder="5d12b98a83b9787e8bb883ef" value={orgId} onChange={this.handleChange} />
            </>
        ) : null

        return (
            <div className="card col-10 shadow align-self-start my-4">
                {error ? <p style={{ color: 'red' }}>{error.message}</p> : null}
                <div className="card-body p-4">
                    <h1 className="heading">Start your Free Trial.</h1>
                    <h5 className="text-dark">Create your account by filling out the form below.</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mt-4">
                            <label htmlFor="name" className="text-dark">
                                Full Name
                            </label>
                            <input type="text" id="name" name="name" className="form-control border-top-0 border-left-0 border-right-0 form-control-lg" placeholder="John Appleseed" value={name} onChange={this.handleChange} />

                            <label htmlFor="email" className="text-dark mt-3">
                                Email (will also be your username)
                            </label>
                            <input type="text" id="email" name="email" className="form-control border-top-0 border-left-0 border-right-0 form-control-lg" placeholder="steve@apple.com" value={email} onChange={this.handleChange} />
                            {orgIdForm}
                            <div className="custom-control custom-checkbox mt-3">
                                <input type="checkbox" className="custom-control-input" id="createOrg" name="createOrg" onChange={this.handleChange} />
                                <label className="custom-control-label text-dark" htmlFor="createOrg">
                                    Create a new organization
                                </label>
                            </div>
                            <label htmlFor="password" className="text-dark mt-3">
                                Password
                            </label>
                            <input type="password" id="password" name="password" className="form-control form-control-lg border-top-0 border-left-0 border-right-0" placeholder="••••••••••••" value={password} onChange={this.handleChange} />
                            <label htmlFor="confirmPassword" className="text-dark mt-3">
                                Confirm Password
                            </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" className="form-control form-control-lg border-top-0 border-left-0 border-right-0" placeholder="••••••••••••" value={confirmPassword} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-lg btn-primary float-right" style={{ marginTop: '35px' }} type="submit">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
