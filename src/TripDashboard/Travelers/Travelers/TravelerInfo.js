import React, { Component } from 'react'
import UpdateTravelerForm from '../Actions/UpdateTravelerForm'
import Image from '../../../util/otherComponents/Image'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'

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
            <div className="shadow px-3" style={{ height: '100vh' }}>
                <div className="row d-flex flex-column justify-content-center align-items-center pt-4">
                    <Image src={image} diameter="150px" />
                </div>
                <div className="row">
                    <div className="container px-4">
                        <div className="mt-4">
                            <span className="h4 mt-3">{name}</span>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Email</div>
                            <div className="row text-primary">{email}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Phone</div>
                            <div className="row text-primary">{phone}</div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Status</div>
                            <div className="row text-primary">
                                <TravelerStatus status={status} />
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row h6 text-dark">Notes</div>
                            <div className="row text-black-50">
                                {personalNotes}
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <UpdateTravelerForm
                                {...this.props}
                                remove={this.handleRemove}
                                submit={this.handleUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
