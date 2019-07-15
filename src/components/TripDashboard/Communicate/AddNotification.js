import React, { Component } from 'react'

class AddNotification extends Component {
    state = {
        text: '',
        subject: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state)
        this.setState({ text: '', subject: '' })
    }

    render() {
        let { text, subject } = this.state
        return (
            <>
                <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#newNotification">
                    NEW NOTIFICATION
                </button>
                <div className="modal fade" id="newNotification" tabIndex="-1" role="dialog" aria-labelledby="addnewNotificationModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addnewNotificationModal">
                                    Add a notification
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row">
                                        <label htmlFor="subject">Subject</label>
                                        <input value={subject} onChange={this.handleChange} type="text" className="form-control" name="subject" placeholder="Your subject" />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="text">Message</label>
                                        <input value={text} onChange={this.handleChange} type="text" className="form-control" name="text" placeholder="Your notification message" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddNotification
