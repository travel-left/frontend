import React from 'react'

export default (props) => (
    <div className="col-md-4 my-2">
        <div className="card shadow mx-2">
            <div className="p-3">
                {props.children}
            </div>
        </div>
    </div>)