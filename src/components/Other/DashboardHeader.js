import React from 'react'

const DashboardHeader = ({title, secondTitle, description, cTor}) => {
    return (
        <div className='mt-4 mt-md-0'>
            <h2>{title} {cTor} {secondTitle}</h2>
            <p>{description}</p>
        </div>
    )
}

export default DashboardHeader