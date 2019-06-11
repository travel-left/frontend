import React from 'react'

const Contact = ({ name, phone, email, photo }) => {
    return (
        <div className="card py-2 shadow my-3">
            <div className="row no-gutters d-flex flex-row justify-content-around align-items-center">
                <div className="col-1 d-none d-md-flex">
                    <img src={photo} className="card-img pl-2" alt="..." style={{ maxHeight: '60px', maxWidth: '60px', borderRadius: '50%' }} />
                </div>
                <div className="col-3">
                    {name}
                </div>
                <div className="col-3">
                    {email}
                </div>
                <div className="col-3">
                    {phone}
                </div>
            </div>
        </div>
    )
}

export default Contact
