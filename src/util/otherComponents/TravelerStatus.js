import React from 'react'
import Chip from '@material-ui/core/Chip'
const TravelerStatus = ({ status }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'INVITED':
            statusColor = '#83C9F4'
            break
        case 'CONFIRMED':
            statusColor = '#1B998B'
            break
        case 'LEFT':
            statusColor = '#0A58CE'
            break
        case 'RETURNED':
            statusColor = '#403F4C'
            break
        case 'NOT GOING':
            statusColor = '#CC444B'
            break
        case 'DOCS DUE':
            statusColor = '#CC444B'
            break
        case 'MONEY DUE':
            statusColor = '#CC444B'
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
                width: 104,
                backgroundColor: statusColor
            }}
            label={status} />
    )
}

export default TravelerStatus
