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
        <span className={`badge badge-${statusColor} badge-pill text-light text-uppercase px-3 py-1`}>
            {status}
        </span>
    )
}

export default TravelerStatus
