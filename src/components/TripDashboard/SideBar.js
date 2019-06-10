import React from 'react'

const SideBar = ({ ctr }) => {
    return (
        <div className="col-md-4 shadow-lg">
            <div className="card bg-light border-0">
                <div className="card-body">
                    {ctr}
                </div>
            </div>
        </div>
    )
}

export default SideBar
