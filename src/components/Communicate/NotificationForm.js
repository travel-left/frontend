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
    }

    render() {
        let { text } = this.state
        return (
            <div className="userForm">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input value={text} onChange={this.handleChange} type="text" class="form-control" name="text" placeholder="Your notification message" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-square dark pull-right">
                        Create Notification
                    </button>
                </form>
            </div>
        )
    }
}

export default NotificationForm
