import React, { Component } from 'react'

class NotificationForm extends Component {
    state = {
        text: ''
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
        this.props.submit(this.state.text)
        this.setState({text: ''})
    }

    render() {
        let { text } = this.state
        return (
            <form onSubmit={this.handleSubmit} style={{marginTop: '65px'}}>
                <h3>Add a notification</h3>
                <div class="form-row">
                    <label htmlFor="text">Message</label>
                    <input value={text} onChange={this.handleChange} type="text" class="form-control" name="text" placeholder="Your notification message" />
                </div>
                <button type="submit" class="btn btn-lg btn-square dark pull-right"> Create Notification </button>
            </form>
        )
    }
}

export default NotificationForm
