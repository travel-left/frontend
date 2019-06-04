import React from 'react'

const SideBar = ({ ctr }) => {
    return (
        <div className="col-4" style={{ backgroundColor: '#FBFBFB', height: '120vh', boxShadow: 'rgb(136, 136, 136) 0px 2px 4px' }}>
            <div className="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                <div className="card-body" style={{ marginTop: '20px' }}>
                    {ctr}
                </div>
            </div>
        </div>
    )
}

export default SideBar
