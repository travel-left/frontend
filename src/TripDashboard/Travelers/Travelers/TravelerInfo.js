import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'

export default class TravelerInfo extends Component {
    handleRemove = () => {
        this.props.remove(this.props.traveler._id)
    }
    handleUpdate = updateObject => {
        this.props.update(this.props.traveler._id, updateObject)
    }
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
            <div className="container pt-3 pb-3">
                <div className="row d-flex flex-column justify-content-center align-items-center">
                    <Image src={image} diameter="150px" />
                    <span className="h4 mt-3">{name}</span>
                </div>
                <div className="row">
                    <div className="container">
                        <div className="col-md-12 mt-3">
                            <div className="row">Email</div>
                            <div className="row text-primary">{email}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">Phone</div>
                            <div className="row text-primary">{phone}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">Status</div>
                            <div className="row text-primary">
                                {' '}
                                <span className="badge badge-primary badge-pill h5 align-self-center bg-secondary">
                                    {status}{' '}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row">Notes</div>
                            <div className="row text-black-50">
                                {personalNotes}
                            </div>
                        </div>
                        <UpdateTravelerForm
                            {...this.props.traveler}
                            remove={this.handleRemove}
                            submit={this.handleUpdate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
