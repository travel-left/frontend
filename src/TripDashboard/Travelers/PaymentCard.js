import React, { useState } from 'react'
import Moment from 'react-moment'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import Typography from '@material-ui/core/Typography'

const PaymentCard = ({ amount, message, messageType, stripeChargeId, createdAt, registrationPayment }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const commModalText = (<div>
        <div className="d-flex">
            <Typography varaint="caption" className="TripInfo-description">{message}</Typography>
        </div>
        <div className="d-flex">
            <Typography varaint="caption" >{amount}</Typography>
        </div>
    </div>)

    return (
        <Card className='col-12 ' style={{ padding: 16, marginTop: 8, marginBottom: 8, borderBottom: stripeChargeId ? '3px solid green' : '3px solid #E24C4C' }}>
            <div className="d-flex justify-content-between align-items-center">
                <div style={{ minWidth: 140 }}>
                    <Moment
                        date={createdAt}
                        format="MMMM DD"
                        className="TravelerInfo-text-date"
                    />
                    <span className="TravelerInfo-text-date">{' - '}{amount} </span>
                    <span className="TravelerInfo-text-date">{registrationPayment ? ' - Registration' : null}</span>
                </div>
                <Fab color={!isModalOpen ? 'primary' : 'secondary'} variant="extended" style={{ fontSize: 12, height: 32, width: 64, color: 'white' }} onClick={() => setIsModalOpen(!isModalOpen)}>
                    {!isModalOpen ? 'VIEW' : 'CLOSE'}
                </Fab>
            </div>
            <div className="d-flex align-items-center">
                {isModalOpen && commModalText}
            </div>
        </Card>
    )
}

export default PaymentCard
