import React from 'react'

const TravelerStatus = ({ status }) => {
    let statusColor = 'primary'
    switch (status) {
        case 'INVITED':
            statusColor = 'secondary'
            break
        case 'CONFRIMED':
            statusColor = 'primary'
            break
        case 'POST-TRIP':
            statusColor = 'dark'
            break
        case 'ON-TRIP':
            statusColor = 'left'
            break
        default:
            break
    }

    return (
        <span
            className={`badge badge-${statusColor} badge-pill text-uppercase`}
            style={{
                fontWeight: '500',
                fontFamily: 'roboto',
                fontSize: '12px',
                padding: '.5rem .8rem',
                minWidth: '88px',
                color: '#FFFFFF'
            }}
        >
            {status}
        </span>
    )
}

export default TravelerStatus
