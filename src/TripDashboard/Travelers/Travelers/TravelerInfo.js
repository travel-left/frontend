import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'
import { apiCall } from '../../../util/api'
import Text from './Text'
import Email from './Email'
import Button from '@material-ui/core/Button'
import './TravelerInfo.css'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

export default class TravelerInfo extends Component {
    state = {
        messages: [],
        showMessages: false,
        isEditModalOpen: false
    }

    constructor(props) {
        super(props)
        this.getMessages()
    }

    closeEditModal = () => this.setState({ isEditModalOpen: false })
    openEditModal = () => this.setState({ isEditModalOpen: true })

    componentDidUpdate(prevProps) {
        if (this.props.traveler._id !== prevProps.traveler._id) {
            this.setState({ showMessages: false })
            this.getMessages()
        }
    }

    getMessages = async () => {
        const { _id } = this.props.traveler
        if (_id) {
            let messages = await apiCall('get', `/api/travelers/${_id}/messages`)
            messages = messages.sort((f, s) => f.createdAt < s.createdAt)
            this.setState({ messages, showMessages: messages.length > 0 })
        }
    }

    handleRemove = () => {
        this.props.remove(this.props.traveler._id)
        this.closeEditModal()
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
            <Card style={{ padding: 16 }}>
                <div className="row d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: 16, marginBottom: 24 }}>
                    <Image src={image} diameter="65px" name={name} />
                </div>
                <div className="d-flex justify-content-center" style={{ marginBottom: 24 }}>
                    <Typography variant="h2">{name}</Typography>
                </div>
                <div className='TripInfo-details' style={{ marginBottom: 24 }}>
                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                        <Typography variant="h6">Email</Typography>
                        <span className='TripInfo-details-date'>{email}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                        <Typography variant="h6">Phone</Typography>
                        <span className='TripInfo-details-date'>{phone}</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                        <Typography variant="h6">Status</Typography>
                        <span><TravelerStatus status={status} /></span>
                    </div>
                    <div className='d-flex flex-column align-items-start' style={{ marginBottom: 24 }}>
                        <Typography variant="h6">Notes</Typography>
                        <span className='TripInfo-description'>{personalNotes}</span>
                    </div>
                    <div className='d-flex flex-column' style={{ marginBottom: 24 }}>
                        <Typography variant="h6">Conversation History</Typography>
                        {messageList}
                    </div>
                </div>
                <Button size="large" variant="contained" color="secondary" style={{ width: '180px', height: '50px', float: 'right' }} onClick={this.openEditModal}>
                    EDIT TRAVELER
                            </Button>
                {
                    this.state.isEditModalOpen &&
                    <LeftModal
                        isOpen={this.state.isEditModalOpen}
                        toggleModal={this.closeEditModal}
                        title='Edit traveler'
                        submit={this.handleUpdate}
                        remove={this.handleRemove}
                        traveler={this.props.traveler}
                        form={UpdateTravelerForm}
                    />
                }
            </Card >
        )
    }
}

const MessageList = ({ messages }) =>
    messages.map(m => (
        m.__t === 'Text' ? <Text key={m._id} message={m.message} createdAt={m.createdAt} />
            : <Email key={m._id} subject={m.subject} body={m.body} createdAt={m.createdAt} />
    ))

