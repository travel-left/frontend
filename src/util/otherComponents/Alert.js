import React from 'react'

export default function Alert({ closeAlert, text }) {
    return (
        <div
            className="row shadow m-4 bg-light text-primary align-items-center d-none d-md-flex"
            style={{ height: '65px' }}
        >
            <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center bg-primary">
                <i className="fas fa-thumbs-up fa-lg text-light" />
            </div>
            <div className="col-10">
                <span>{text}</span>
            </div>
            <div className="col-1 d-flex align-self-stretch justify-content-center align-items-center">
                <i
                    className="fas fa-times fa-md text-dark hover"
                    onClick={closeAlert}
                />
            </div>
        </div>
    )
}
