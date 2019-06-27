import React, { Component } from 'react'
import AddImage from '../Other/AddImage'
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
            organization: {
                img: '',
                name: '',
                website: ''
            }
        }
        console.log(this.state)
    }

    async handleSubmit(e) {
        const { onAuth, history } = this.props
        e.preventDefault()
        try {
            await onAuth('signin?newOrg=true', this.createNewCoordinator(this.state))
            history.push('/')
            this.setState({
                error: null,
                name: '',
                email: '',
                password: '',
                title: '',
                phone: '',
                organization: {
                    img: '',
                    name: '',
                    website: ''
                }
            })
        } catch (err) {
            console.log(err)
            this.setState({ error: err })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createNewCoordinator() {
        const names = this.state.name.split(' ')

        const [fName] = names
        const lName = names.length > 1 ? names[names.length - 1] : ''

        const ret = {
            ...this.state,
            firstName: fName,
            lastName: lName,
            password: this.props.password
        }

        delete ret.error

        return ret
    }

    handleNewProfileImage = ({ img }) => {
        this.setState({
            img: img
        })
    }

    handleNewOrganizationImage = ({ img }) => {
        this.setState({
            organization: {
                img: img
            }
        })
    }

    render() {
        const { error, img, organization } = this.state
        return (
            <>
                <h1 className="display-4 text-dark font-weight-bold p-4">Let's set up your profile and company!</h1>
                <div className="row">
                    <div className="col-sm-12 col-md-6 p-3">
                        <AddImage img={img} name="Profile Picture" submit={this.handleNewProfileImage} />
                    </div>
                    <div className="col-sm-12 col-md-6 p-3">
                        <AddImage img={organization.img} name="Company Picture" submit={this.handleNewOrganizationImage} />
                    </div>
                </div>
            </>
        )
    }
}
