import React, { Component } from 'react'
import AddImage from '../Other/AddImage'
import TextInput from '../Other/TextInput'
import './Auth.css'

export default class CreateProfile extends Component {
    constructor(props) {
        super(props)
        const { state } = props.history.location
        this.state = {
            error: state.error,
            name: state.name,
            email: state.email,
            title: '',
            phone: '',
            img: '',
            oImg: '',
            oName: '',
            oWebsite: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { onAuth, history } = this.props
        try {
            onAuth('signup?newOrg=true', this.createNewCoordinator()).then(() => {
                history.push('/')
            })
        } catch (err) {
            console.log(err)
            this.setState({ error: err })
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    createNewCoordinator() {
        const { oImg, oName, oWebsite } = this.state
        if (!oName) {
            throw new Error('Organization name is required')
        }
        const names = this.state.name.split(' ')

        const [fName] = names
        const lName = names.length > 1 ? names[names.length - 1] : ''

        const ret = {
            ...this.state,
            firstName: fName,
            lastName: lName,
            password: this.props.history.location.state.password,
            organization: {
                img: oImg,
                name: oName,
                website: oWebsite
            }
        }

        delete ret.error
        delete ret.name
        delete ret.oImg
        delete ret.oName
        delete ret.oWebsite

        return ret
    }

    handleNewProfileImage = ({ img, error }) => {
        this.setState({
            img: img,
            error: error
        })
    }

    handleNewOrganizationImage = ({ img, error }) => {
        this.setState({
            error: error,
            oImg: img
        })
    }

    render() {
        const { error, img, oImg, name, email, title, phone, oWebsite, oName } = this.state
        const errorElement = error ? <h3 className="text-danger">Error: {error.message}</h3> : null
        const classes = ['form-control', 'border-top-0', 'border-left-0', 'border-right-0', 'form-control-lg']
        return (
            <>
                <h1 className="display-4 text-dark font-weight-bold py-4 mx-5">Let's set up your profile and company!</h1>
                <form onSubmit={this.handleSubmit}>
                    {errorElement}
                    <div className="row mx-5">
                        <div className="col-sm-12 col-md-6">
                            <AddImage img={img} name="Profile Picture" submit={this.handleNewProfileImage} />
                            <div className="form-group mt-4">
                                <TextInput name="name" type="text" classes={classes} value={name} label="Full Name" placeholder="John Appleseed" change={this.handleChange} />
                                <TextInput name="email" type="email" classes={classes} value={email} label="Email" placeholder="john@apple.com" change={this.handleChange} />
                                <TextInput name="title" type="text" classes={classes} value={title} label="Title" placeholder="Trip Coordinator" change={this.handleChange} />
                                <TextInput name="phone" type="tel" classes={classes} value={phone} label="Phone Number" placeholder="123-456-7890" change={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <AddImage img={oImg} name="Company Picture" submit={this.handleNewOrganizationImage} />
                            <TextInput name="oName" type="text" value={oName} label="Organization Name" placeholder="Travel LEFT" change={this.handleChange} />
                            <TextInput name="oWebsite" type="url" value={oWebsite} label="Website" placeholder="https://travel-left.com" change={this.handleChange} />
                            <button className="btn btn-lg btn-primary float-right m-4" type="submit">
                                SAVE
                            </button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
