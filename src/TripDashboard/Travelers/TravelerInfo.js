import React, { Component } from 'react'
import Image from '../../util/otherComponents/Image'
import TravelerStatus from '../../util/otherComponents/TravelerStatus'
import { apiCall } from '../../util/api'
import CommCard from './CommCard'
import Button from '@material-ui/core/Button'
import './TravelerInfo.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LeftModal from '../../util/otherComponents/LeftModal'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import TravelerForm from '../../Forms/TravelerForm'
import PaymentCard from './PaymentCard'

export default class TravelerInfo extends Component {
    state = {
        messages: [],
        payments: [],
        isEditModalOpen: false,
        tab: 0
    }

    constructor(props) {
        super(props)
        this.getMessages()
        this.getPayments()
    }

    closeEditModal = () => this.setState({ isEditModalOpen: false })
    openEditModal = () => this.setState({ isEditModalOpen: true })

    componentDidUpdate(prevProps) {
        if (this.props.traveler._id !== prevProps.traveler._id) {
            this.getMessages()
            this.getPayments()
        }
    }

    getMessages = async () => {
        const { _id } = this.props.traveler
        if (_id) {
            let messages = await apiCall('get', `/api/travelers/${_id}/messages`)
            messages = messages.sort((f, s) => f.createdAt < s.createdAt)
            this.setState({ messages })
        }
    }

    getPayments = async () => {
        const { _id } = this.props.traveler
        console.log(this.props.traveler)
        if (_id) {
            let payments = await apiCall('get', `/api/travelers/${_id}/payments`)
            console.log(payments)
            payments = payments.sort((f, s) => f.createdAt < s.createdAt)
            this.setState({ payments })
        }
    }

    handleRemove = () => {
        this.props.remove(this.props.traveler._id)
        this.closeEditModal()
    }

    handleUpdate = updateObject => {
        this.props.update(this.props.traveler._id, updateObject)
    }

    handleChangeTab = (e, newValue) => {
        this.setState({ tab: newValue })
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

        const { messages, payments } = this.state

        const messageList = <MessageList messages={messages} />
        const paymentList = payments.map(p => <PaymentCard key={p._id} {...p} />)

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
                        <Tabs
                            variant="fullWidth"
                            value={this.state.tab}
                            onChange={this.handleChangeTab}
                            aria-label="nav tabs example"
                        >
                            <Tab label={<Typography variant="h6">Conversations</Typography>} style={{ textTransform: 'none' }}>
                            </Tab>
                            <Tab label={<Typography variant="h6">Payments</Typography>} style={{ textTransform: 'none' }} />
                            {/* <Tab label={<Typography variant="h6">Forms</Typography>} style={{ textTransform: 'none' }} /> */}
                        </Tabs>
                        {this.state.tab === 0 && messageList}
                        {this.state.tab === 1 && paymentList}
                        {/* get all payments from Traveler
                        create a payment Component
                        display payment and mark completed or not based off of stripeChargeid */}
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
                        form={TravelerForm}
                    />
                }
            </Card >
        )
    }
}

const MessageList = ({ messages }) =>
    messages.map(m => (
        m.__t === 'Text' ? <CommCard key={m._id} text={m.message} createdAt={m.createdAt} />
            : <CommCard key={m._id} text={m.subject} body={m.body} createdAt={m.createdAt} />
    ))

