import React from 'react'

const TripStatus = ({ status }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'LEFT':
            statusColor = 'left'
            status = 'Left'
            break
        case 'PLANNING':
            statusColor = 'secondary'
            status = 'Planning'
            break
        case 'PAST':
            statusColor = 'dark'
            status = 'Past'
            break
        case 'ARCHIVED':
            statusColor = 'archived'
            status = 'Archived'
            break
        default:
            break
    }

    return (
        <span
            className={`badge badge-${statusColor} badge-pill`}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '18px',
                padding: '.5rem .8rem',
                minWidth: '88px',
                color: '#FFFFFF'
            }}
        >
            {status}
        </span>
    )
}

export default TripStatus

