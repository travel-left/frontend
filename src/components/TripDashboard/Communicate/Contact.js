import React from 'react'

const Contact = ({ name, phone, email, photo }) => {
    return (
        <div className="card" style={{ minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px' }}>
            <div className="row no-gutters" style={{ justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center' }}>
                <div className="col-1">
                    <img src={photo} className="card-img" alt="..." style={{ maxHeight: '60px', maxWidth: '60px', borderRadius: '50%', marginLeft: '15px' }} />
                </div>
                <div className="col-3 hover">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600', marginLeft: '25px' }}>
                        {name}
                    </p>
                </div>
                <div className="col-2 hover">
                    <p className="card-text" style={{ padding: '15px 0px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600' }}>
                    </p>
                </div>
                <div className="col-3">
                    <p className="card-text" style={{ padding: '15px 5px 15px 0px', color: '#A3A3A3' }}>
                        {email}
                    </p>
                </div>
                <div className="col-3">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                        {phone}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Contact
