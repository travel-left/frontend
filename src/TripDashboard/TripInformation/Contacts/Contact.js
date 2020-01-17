import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import './Contact.css'
import LeftModal from '../../../util/otherComponents/LeftModal'
import ContactForm from '../../../Forms/ContactForm'
import LeftCardNew from '../../../util/otherComponents/LeftCardNew'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import LeftFab from '../../../util/otherComponents/LeftFab'

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
                <Image diameter={64} src={image} name={name} />
                <div className="d-flex flex-column justify-content-center">
                    {name && <span className="Coordinator-name">{name}</span>}
                    {phone && <a className="Coordinator-info" href={`tel:${phone}`}>{phone}</a>}
                    {email && <span className="Coordinator-info">{email}</span>}
                </div>
                <>
                    {!this.props.share ? <LeftFab id="contact-edit-button"
                        onClick={this.openModal}
                        fab
                        text='EDIT'>
                    </LeftFab> : <a className="Coordinator-info" href={`tel:${phone}`} style={{ width: '54px', }}>
                            {phone && <PhoneInTalkIcon fontSize="large" color="primary" />}
                        </a>
                    }
                    {
                        this.state.isEditContactModalOpen && <LeftModal
                            isOpen={this.state.isEditContactModalOpen}
                            toggleModal={this.closeModal}
                            title='Remove contact from trip'
                            form={ContactForm}
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
