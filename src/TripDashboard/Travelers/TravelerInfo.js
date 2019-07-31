import React, { Component } from 'react'

export default class TravelerInfo extends Component {
    render() {
        let {
            name,
            image,
            email,
            status,
            phone,
            personalNotes
        } = this.props.traveler

        return (
            <div className="pb-3 bg-light">
                <img
                    src={image}
                    className="card-img-top border-0 mb-4 px-2"
                    alt="..."
                    style={{ backgroundColor: '#FBFBFB' }}
                />
                <div className="container bg-light">
                    <div className="row">
                        <div className="col-6">
                            <span className="h4">{name}</span>
                        </div>
                        <div className="col-6">
                            <h5 className="text-light ml-0">
                                Status:
                                <span className="badge badge-primary badge-pill h5 align-self-center ml-2 bg-secondary">
                                    {status}{' '}
                                </span>
                                <i className="far fa-edit ml-2" />
                            </h5>
                        </div>
                    </div>
                    <p className="py-3 ">
                        Personal notes:{' '}
                        <span className="text-black-50">{personalNotes}</span>
                    </p>
                    <p>
                        Email: <span className="text-black-50">{email}</span>
                    </p>
                    <p>
                        Phone: <span className="text-black-50">{phone}</span>
                    </p>
                </div>
            </div>
        )
    }
}
