import React, { Component } from 'react'
import Image from '../../util/otherComponents/Image'
import TravelerStatus from '../../util/otherComponents/TravelerStatus'
import { apiCall } from '../../util/api'
import CommCard from './CommCard'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LeftModal from '../../util/otherComponents/LeftModal'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import TravelerForm from '../../Forms/TravelerForm'
import PaymentCard from './PaymentCard'
import LeftButton from '../../util/otherComponents/LeftButton'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const styles = theme => ({
    travelerInfo: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    travelerInfoImage: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
    },
    traverInfoName: {
        display: "flex",
        justifyContent: "center",
        marginBottom: theme.spacing(3),
    },
    travelerInfoData: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(3)
    },
    notes: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginBottom: theme.spacing(3)
    },
    tabs: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(3)
    }
})

class TravelerInfo extends Component {
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

    toggleModal = () => this.setState({ isEditModalOpen: !this.state.isEditModalOpen })

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
        this.toggleModal()
    }

    handleUpdate = updateObject => {
        this.props.update(this.props.traveler._id, updateObject)
    }

    handleChangeTab = (e, newValue) => {
        this.setState({ tab: newValue })
    }

    render() {
        const {
            name,
            image,
            email,
            status,
            phone,
            personalNotes
        } = this.props.traveler
        const { classes } = this.props
        const { messages, payments } = this.state

        const messageList = <MessageList messages={messages} />
        const paymentList = payments.map(p => <PaymentCard key={p._id} {...p} />)

        return (
            <>
                <Fade in={true} timeout={700}>
                    <Card className={classes.travelerInfo}>
                        <div className={classes.travelerInfoImage}>
                            <Image src={image} diameter="65px" name={name} />
                        </div>
                        <div className={classes.traverInfoName} >
                            <Typography variant="h2">{name}</Typography>
                        </div>
                        <div>
                            <div className={classes.travelerInfoData}>
                                <Typography variant="h6">Email</Typography>
                                <Typography variant="subtitle2">{email}</Typography>
                            </div>
                            <div className={classes.travelerInfoData}>
                                <Typography variant="h6">Phone</Typography>
                                <Typography variant="subtitle2">
                                    {phone}
                                    <a target="_blank" href={`https://wa.me/${phone}`}>{phone && <WhatsAppIcon></WhatsAppIcon>}</a>
                                </Typography>
                            </div>
                            <div className={classes.travelerInfoData}>
                                <Typography variant="h6">Status</Typography>
                                <span><TravelerStatus status={status} /></span>
                            </div>
                            <div className={classes.notes}>
                                <Typography variant="h6">Notes</Typography>
                                <Typography variant="subtitle2" id="notes">{personalNotes}</Typography>
                            </div>
                            <div className={classes.tabs}>
                                <Tabs
                                    variant="fullWidth"
                                    value={this.state.tab}
                                    onChange={this.handleChangeTab}
                                    aria-label="nav tabs example"
                                >
                                    <Tab label={<Typography variant="h6">Conversations</Typography>} style={{ textTransform: 'none' }}>
                                    </Tab>
                                    <Tab label={<Typography variant="h6">Payments</Typography>} style={{ textTransform: 'none' }} />
                                </Tabs>
                                {this.state.tab === 0 && messageList}
                                {this.state.tab === 1 && paymentList}
                            </div>
                        </div>
                        <LeftButton color="secondary" float id="edit-info-button" onClick={this.toggleModal}>
                            EDIT Info
                    </LeftButton>
                    </Card >
                </Fade>
                <>
                    {
                        this.state.isEditModalOpen &&
                        <LeftModal
                            closeModal={this.toggleModal}
                            title='Edit info'
                            submit={this.handleUpdate}
                            remove={this.handleRemove}
                            traveler={this.props.traveler}
                            form={TravelerForm}
                        />
                    }
                </>
            </>
        )
    }
}

const MessageList = ({ messages }) =>
    messages.map(m => (
        m.__t === 'Text' ? <CommCard key={m._id} text={m.message} createdAt={m.createdAt} />
            : <CommCard key={m._id} text={m.subject} body={m.body} createdAt={m.createdAt} />
    ))

export default withStyles(styles)(TravelerInfo)