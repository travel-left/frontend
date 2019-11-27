import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import './Contact.css'
import CreateContactForm from './ContactForm'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'
import LeftCardNew from '../../../util/LeftCardNew'

class Contact extends Component {
    state = {
        isEditContactModalOpen: false
    }

    closeModal = () => (this.setState({ isEditContactModalOpen: false }))
    openModal = () => (this.setState({ isEditContactModalOpen: true }))

    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
        this.closeModal()
    }

    render() {
        let { name, phone, email, image } = this.props

        return (
            <LeftCardNew height={100}>
                <Image src={image} diameter="48px" name={name} />
                <div className="d-flex flex-column justify-content-center">
                    {name && <span className="Coordinator-name">{name}</span>}
                    {phone && <span className="Coordinator-info">{phone}</span>}
                    {email && <span className="Coordinator-info">{email}</span>}
                </div>
                <>
                    <Fab onClick={this.openModal} variant="extended" style={{ width: 54, height: 25, backgroundColor: '#475561', fontSize: 12, fontWeight: 600, color: 'white' }}>
                        Edit
                    </Fab>
                    {
                        this.state.isEditContactModalOpen && <LeftModal
                            isOpen={this.state.isEditContactModalOpen}
                            toggleModal={this.closeModal}
                            title='Remove contact from trip'
                            form={CreateContactForm}
                            submit={this.handleEdit}
                            name={name}
                            phone={phone}
                            email={email}
                            remove={this.handleDelete}
                        />
                    }
                </>
            </LeftCardNew>
        )
    }
}

export default Contact
