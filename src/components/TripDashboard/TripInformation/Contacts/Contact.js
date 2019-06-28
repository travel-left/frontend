import React, { Component } from 'react'
import UpdateContactForm from './UpdateContactForm'

class Contact extends Component {

    constructor(props) {
        super(props)
    }

    handleUpdateContact = updateObject => {
        this.props.updateContact(this.props._id, updateObject)
    }

    render() {
        let { name, phone, email, photo, _id } = this.props

        return (
            <div className="mb-3 col-md-5 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <img src={photo} class="card-img rounded-circle px-2 py-2" alt="..."></img>
                    </div>
                    <div className="col-md-6">
                        <div className="ml-3">
                            <p className="text-bold my-1">{name}</p>
                            <p className="my-1">{phone}</p>
                            <p className="my-1"><small class="text-muted">{email}</small></p>
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
