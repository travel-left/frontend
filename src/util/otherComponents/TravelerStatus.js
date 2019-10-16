import React from 'react'
import Chip from '@material-ui/core/Chip'
const TravelerStatus = ({ status }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'INVITED':
            statusColor = '#A2E247'
            break
        case 'CONFIRMED':
            statusColor = '#92CFF8'
            break
        case 'ON-TRIP':
            statusColor = '#1F5FD9'
            break
        case 'POST-TRIP':
            statusColor = '#FCB511'
            break
        case 'NOT-GOING':
            statusColor = '#FB605B'
            break
        default:
            statusColor = '#B4BDC8'
            break
    }

    return (
        <Chip
            className={`text-uppercase`}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '12px',
                padding: '.5rem .8rem',
                minWidth: '88px',
                color: '#FFFFFF',
                backgroundColor: statusColor
            }}
            label={status} />
    )
}

export default TravelerStatus
