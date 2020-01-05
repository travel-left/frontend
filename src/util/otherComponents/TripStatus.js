import React from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'

const TripStatus = ({ status, fab, onClick }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'PLANNING':
            statusColor = '#83C9F4'
            break
        case 'PLANNED':
            statusColor = '#1B998B'
            break
        case 'LEFT':
            statusColor = '#0A58CE'
            break
        case 'RETURNED':
            statusColor = '#403F4C'
            break
        case 'ARCHIVED':
            statusColor = '#CC444B'
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
            minWidth: '88px',
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

