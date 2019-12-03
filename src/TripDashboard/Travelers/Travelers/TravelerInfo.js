import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'
import { apiCall } from '../../../util/api'
import Text from './Text'
import Email from './Email'
import './TravelerInfo.css'

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
            <MessageList messages={messages} />
        ) : null

        return (
            <div style={{ padding: 16 }}>
                <div className="row d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: 16 }}>
                    <Image src={image} diameter="65px" name={name} />
                </div>
                <div className="row">
                    <div className="container" style={{ paddingLeft: 16, paddingRight: 16 }}>
                        <div className="mt-4 d-flex justify-content-center">
                            <span className="mt-2 TravelerInfo-name">{name}</span>
                        </div>
                        <div className="row pt-5">
                            <div className="col">
                                <span className="TravelerInfo-key d-block">Email</span>
                                <span className="TravelerInfo-value">{email}</span>
                            </div>
                            <div className="col">
                                <span className="TravelerInfo-key d-block">Phone</span>
                                <span className="TravelerInfo-value">{phone}</span>
                            </div>
                        </div>
                        <div className="row pt-4">
                            <div className="col TravelerInfo-key">Status</div>
                            <div className="col text-primary">
                                <TravelerStatus status={status} />
                            </div>
                        </div>
                        <div className="col-md-12 pt-4">
                            <div className="row TravelerInfo-key">Notes</div>
                            <div className="row TravelerInfo-notes">
                                {personalNotes}
                            </div>
                        </div>
                        <div className="col-md-12 pt-4">
                            <div className="row TravelerInfo-key">Conversation History</div>
                            <div className="row">
                                {messageList}
                            </div>
                        </div>
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
    messages.map(m => (
        m.__t === 'Text' ? <Text key={m._id} message={m.message} createdAt={m.createdAt} />
            : <Email key={m._id} subject={m.subject} body={m.body} createdAt={m.createdAt} />
    ))

