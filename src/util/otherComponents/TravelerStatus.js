import React from 'react'
import Chip from '@material-ui/core/Chip'
const TravelerStatus = ({ status, className }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'INVITED':
            statusColor = '#96DC4F'
            break
        case 'CONFIRMED':
            statusColor = '#83C9F4'
            break
        case 'LEFT':
            statusColor = '#0A58CE'
            break
        case 'RETURNED':
            statusColor = '#475561'
            break
        case 'NOT GOING':
            statusColor = '#FF5555'
            break
        case 'DOCS DUE':
            statusColor = '#FFAA31'
            break
        case 'MONEY DUE':
            statusColor = '#FFAA31'
            break
        default:
            statusColor = '#AAB5C0'
            break
    }

    return (
        <Chip
            className={className}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '12px',
                padding: '.5rem .8rem',
                minWidth: '88px',
                color: '#FFFFFF',
                width: 104,
                backgroundColor: statusColor,
                textTransform: 'uppercase'
            }}
            label={status} />
    )
}

export default TravelerStatus
