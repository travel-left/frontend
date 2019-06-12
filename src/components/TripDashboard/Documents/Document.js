import React from 'react'

const Document = ({ name, description, link }) => {
    return (
        <div className="card px-2 shadow my-2 py-4">
            <div className="row no-gutters justify-content-between align-items-center">
                <div className="col-5 col-md-3">
                    {name}
                </div>
                <div className="col-4 d-none d-md-flex">
                    {description}
                </div>
                <div className="col-5 col-md-3">
                    {link}
                </div>
                <div className="col-2 col-md-1">
                    <span class="badge badge-primary badge-pill">
                        EDIT
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Document
