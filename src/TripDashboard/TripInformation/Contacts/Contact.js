import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import UpdateContactForm from './UpdateContactForm'
import LeftCard from '../../../util/LeftCard'

class Contact extends Component {
    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    render() {
        let { name, phone, email, image } = this.props

        return (
            <LeftCard>
                <div className="row">
                    <div className="col-md-3 d-flex align-items-center">
                        <Image src={image} diameter="55px" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        {name && <p className="m-0">{name}</p>}
                        {email && (
                            <p className="m-0">
                                <small className="text-muted">{email}</small>
                            </p>
                        )}
                        {phone && (
                            <p className="m-0">
                                <small className="text-muted">{phone}</small>
                            </p>
                        )}
                    </div>
                    <div className="col-md-3">
                        <UpdateContactForm
                            {...this.props}
                            submit={this.handleEdit}
                            remove={this.handleDelete}
                        />
                    </div>
                </div>
            </LeftCard>
        )
    }
}

export default Contact
