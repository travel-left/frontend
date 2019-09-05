import React from 'react'

const TripStatus = ({ status }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'LEFT':
            statusColor = 'left'
            break
        case 'PLANNING':
            statusColor = 'secondary'
            break
        case 'PAST':
            statusColor = 'dark'
            break
        case 'ARCHIVED':
            statusColor = 'archived'
            break
        default:
            break
    }

    return (
        <span
            className={`badge badge-${statusColor} badge-pill text-light text-uppercase`}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '12px',
                padding: '.5rem .8rem',
                minWidth: '88px'
            }}
        >
            {status}
        </span>
    )
}

export default TripStatus

