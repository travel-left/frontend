import React from 'react'

const SideBar = ({ ctr }) => {
    return (
        <div className="col-md-4 shadow-lg card border-0">
            <div className="card-body">
                {ctr}
            </div>
        </div>
    )
}

export default SideBar
