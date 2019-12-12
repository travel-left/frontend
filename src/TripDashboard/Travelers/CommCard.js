import React, { useState } from 'react'
import Moment from 'react-moment'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import LeftModal from '../../util/otherComponents/LeftModal'
import Typography from '@material-ui/core/Typography'

const CommCard = ({ text, body, createdAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const commModalText = body ? (
        <div>
            <div className="d-flex">
                <Typography varaint="caption" className="TripInfo-description">{text}</Typography>
            </div>
            <div className="d-flex">
                <Typography varaint="caption" >{body.split('here</a> to')[1] || body}</Typography>
            </div>
        </div>)
        : (<div className="d-flex">
            <Typography varaint="caption">{text.split('Please')[0]}</Typography>
        </div>)
    return (
        <Card className='col-12 ' style={{ padding: 16, marginTop: 8, marginBottom: 8 }}>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Moment
                        date={createdAt}
                        format="MMMM DD"
                        className="TravelerInfo-text-date"
                    />
                    <span className="TravelerInfo-text-date">{body ? ' - Email' : ' - Text\xa0\xa0'}</span>
                </div>
                <span style={{ textAlign: 'left', paddingLeft: 16 }} className="flex-grow-1">{text.substring(0, 30)}...</span>
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

export default CommCard
