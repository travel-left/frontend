import React from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'

const TripStatus = ({ status, fab, onClick }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'PLANNING':
            statusColor = '#96DC4F'
            break
        case 'PLANNED':
            statusColor = '#83C9F4'
            break
        case 'LEFT':
            statusColor = '#0A58CE'
            break
        case 'RETURNED':
            statusColor = '#475561'
            break
        case 'ARCHIVED':
            statusColor = '#FF5555'
            break
        default:
            break
    }

    const tripStatus = fab ? <Fab variant="extended" className={`text-uppercase`} onClick={onClick}
        style={{
            fontWeight: '500',
            fontFamily: 'roboto',
            fontSize: '12px',
            color: '#FFFFFF',
            backgroundColor: statusColor,
            minWidth: 88,
            height: 32
        }}>{status}</Fab> :
        <Chip
            className={`text-uppercase`}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '12px',
                color: '#FFFFFF',
                backgroundColor: statusColor,
                minWidth: '88px',
            }}
            label={status} />
    return tripStatus
}

export default TripStatus

