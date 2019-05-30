import React from 'react'

const Notification = ({ text }) => {
    return (
        <div className="card" style={{ minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px' }}>
            <div className="row no-gutters" style={{ justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center' }}>
                <div className="col-1">
                    <img src="" className="card-img" alt="..." style={{ maxHeight: '60px', maxWidth: '60px', borderRadius: '50%', marginLeft: '15px' }} />
                </div>
                <div className="col-7 hover">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600', marginLeft: '25px' }}>
                    {text}
                    </p>
                </div>
                <div className="col-4">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Notification
