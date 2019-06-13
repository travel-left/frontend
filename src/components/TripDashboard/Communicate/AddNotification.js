import React, { Component } from 'react'

class AddNotification extends Component {
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
        this.setState({ text: '' })
    }

    render() {
        let { text } = this.state
        return (
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newNotification">
                    NEW NOTIFICATION
                </button>
                <div class="modal fade" id="newNotification" tabindex="-1" role="dialog" aria-labelledby="addnewNotificationModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewNotificationModal">
                                    Add a notification
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <label htmlFor="text">Message</label>
                                        <input value={text} onChange={this.handleChange} type="text" class="form-control" name="text" placeholder="Your notification message" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmit} type="button" class="btn btn-primary" data-dismiss="modal">
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
