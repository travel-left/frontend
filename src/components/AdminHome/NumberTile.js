import React from 'react'

const NumberTile = ({phrase, number}) => {
    return (
        <div className="col-4">
            <div className="card" style={{width: '22rem', boxShadow: 'rgba(0, 0, 0, 0.25) -2px -1px 16px 0px'}}>
                <div className="card-body">
                    <h2 className="card-title" style={{color: '#4FCBD0'}}>   <strong>{number}</strong>   </h2>
                    <h5 className="card-subtitle mb-2 text-muted">{phrase}</h5>
                </div>
            </div>
        </div>
    )
}

export default NumberTile 