import React from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'

const TripStatus = ({ status, fab, onClick }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'LEFT':
            statusColor = '#1F5FD9'
            break
        case 'PLANNING':
            statusColor = '#83C9F4'
            break
        case 'PAST':
            statusColor = '#FCB511'
            break
        case 'ARCHIVED':
            statusColor = '#B4BDC8'
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

