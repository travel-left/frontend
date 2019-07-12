import React, { Component } from 'react'
import Image from '../../../Other/Image'
import UpdateContactForm from './UpdateContactForm'

class Contact extends Component {
    handleUpdateContact = updateObject => {
        this.props.updateContact(this.props._id, updateObject)
    }

    render() {
        let { name, phone, email, photo, _id } = this.props

        return (
            <div className="mb-3 col-md-5 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <Image diameter="75px" src={photo} />
                    </div>
                    <div className="col-md-6">
                        <div className="ml-3">
                            <p className="text-bold my-1">{name}</p>
                            <p className="my-1">{phone}</p>
                            <p className="my-1">
                                <small className="text-muted">{email}</small>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center">
                        <UpdateContactForm name={name} photo={photo} phone={phone} email={email} id={_id} submit={this.handleUpdateContact} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
