import React, { Component } from 'react'
import SidePicture from './SidePicture'
import './Auth.css'

export default class Auth extends Component {
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)
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
        const { type } = this.props
        return (
            <div className="row no-gutters">
                <div className="col-md-12 col-lg-6"></div>
                <div className="col-md-12 col-lg-6">
                    <SidePicture onClick={this.handleSwitch} type={type} />
                </div>
            </div>
        )
    }
}
