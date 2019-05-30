import React from 'react'

const Document = ({ name, description, link }) => {
    return (
        <div className="card" style={{ minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px' }}>
            <div className="row no-gutters" style={{ justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center' }}>
                <div className="col-3 hover">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600', marginLeft: '25px' }}>
                        {name}
                    </p>
                </div>
                <div className="col-3 hover">
                    <p className="card-text" style={{ padding: '15px 0px', fontSize: '1em', color: '#3A3A3A', fontWeight: '600' }}>
                        {description}
                    </p>
                </div>
                <div className="col-3">
                    <p className="card-text" style={{ padding: '15px 5px 15px 0px', color: '#A3A3A3' }}>
                        {link}
                    </p>
                </div>
                <div className="col-2">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                        <span class="badge badge-primary badge-pill" style={{ padding: '5px 10px', backgroundColor: '#8ECFF5' }}>
                            EDIT
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Document
