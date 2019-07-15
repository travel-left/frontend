import React from 'react'
import Image from '../../../Other/Image'

const Cohort = ({ name }) => {
    return (
        <div className="card">
            <div className="row no-gutters" style={{ justifyContent: 'space-around' }}>
                <div className="col-1">
                    <Image src="..." diameter="75px" />
                </div>
                <div className="col-2">
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                        <small className="text-muted">{name}</small>
                    </p>
                </div>
                <div className="col-3" style={{ flexGrow: 2 }}>
                    <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                        <small className="text-muted" />
                    </p>
                </div>
                <div className="col-2" />
                <div className="col-2">
                    <p className="card-text pull-right" style={{ padding: '15px 5px 15px 5px' }}>
                        <small className="text-muted" />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cohort
