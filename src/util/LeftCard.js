import React from 'react'

export default props => (
    <div className="col-md-4 animated fadeIn my-4 px-4">
        <div className="row align-items-center justify-content-around" style={{
            background: '#FFFFFF',
            boxShadow: '0 0 50px 0 rgba(0,0,0,0.10)',
            borderRadius: '8px',
            border: 'none',
            height: '100px',
            width: '340px'
        }}>
            {props.children}
        </div>
    </div>
)