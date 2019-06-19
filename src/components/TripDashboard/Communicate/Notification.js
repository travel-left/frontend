import React, { Component } from 'react'

class Notification extends Component {
    handleSend = () => {
        const { id, send } = this.props
        send(id)
    }

    render() {
        const { sent, subject, text } = this.props
        const sendButtonText = sent ? 'Send Again' : 'Send'
        return (
            <div className="card py-2 my-3 pl-2 shadow">
                <div className="row no-gutters d-flex flex-row justify-content-around align-items-center">
                    <strong className="col-4">{subject}</strong>
                    <div className="col-6">{text}</div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={this.handleSend}>
                            {sendButtonText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notification
