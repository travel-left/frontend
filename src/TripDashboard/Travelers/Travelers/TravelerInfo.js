import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'
import { apiCall } from '../../../util/api'
import Text from './Text'
import Email from './Email'

export default class TravelerInfo extends Component {
    state = {
        messages: [],
        showMessages: false
    }

    constructor(props) {
        super(props)
        this.getMessages()
    }

    componentDidUpdate(prevProps) {
        if (this.props.traveler._id !== prevProps.traveler._id) {
            this.setState({ showMessages: false })
            this.getMessages()
        }
    }

    getMessages = async () => {
        const { _id } = this.props.traveler
        let messages = await apiCall('get', `/api/travelers/${_id}/messages`)
        messages = messages.sort((f, s) => f.createdAt < s.createdAt)
        this.setState({ messages, showMessages: messages.length > 0 })
    }

    handleRemove = () => {
        this.props.remove(this.props.traveler._id)
    }

    handleUpdate = updateObject => {
        this.props.update(this.props.traveler._id, updateObject)
    }

    render() {
        let {
            name,
            image,
            email,
            status,
            phone,
            personalNotes
        } = this.props.traveler

        const { showMessages, messages } = this.state

        const messageList = showMessages ? (
            <div className="col-md-12 mt-3">
                <div className="row h6 text-dark">Messages</div>
                <div className="row text-black-50">
                    <MessageList messages={messages} />
                </div>
            </div>
        ) : null

        return (
            <div className="shadow px-3 pb-5">
                <div className="row d-flex flex-column justify-content-center align-items-center pt-4">
                    <Image src={image} diameter="150px" name={name} />
                </div>
                <div className="row">
                    <div className="container px-4">
                        <div className="mt-4">
                            <span className="h4 mt-3">{name}</span>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Email</div>
                            <div className="row text-primary">{email}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Phone</div>
                            <div className="row text-primary">{phone}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Status</div>
                            <div className="row text-primary">
                                <TravelerStatus status={status} />
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Notes</div>
                            <div className="row text-black-50">
                                {personalNotes}
                            </div>
                        </div>
                        {messageList}
                        <div className="col-md-12 mt-3">
                            <UpdateTravelerForm
                                {...this.props}
                                remove={this.handleRemove}
                                submit={this.handleUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const MessageList = ({ messages }) =>
    messages.map(m =>
        m.__t === 'Text' ? (
            <Text key={m._id} message={m.message} />
        ) : (
            <Email key={m._id} subject={m.subject} body={m.body} />
        )
    )
