import React from 'react'
import Chip from '@material-ui/core/Chip'

const TripStatus = ({ status }) => {
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

    return (
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
    )
}

export default TripStatus

