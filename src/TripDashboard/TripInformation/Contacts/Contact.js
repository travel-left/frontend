import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import UpdateContactForm from './UpdateContactForm'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import './Contact.css'
import CreateContactForm from './CreateContactForm'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'

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
    }

    render() {
        let { name, phone, email, image } = this.props

        return (
            <Grid item xs={12} md={6}>
                <Card className='d-flex justify-content-around align-items-center animated fadeIn' style={{ height: 100, width: 420, marginTop: 16, marginRight: 32, marginBottom: 16 }}>
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
                                title='Remove coordinator from trip'
                                submit={this.handleDelete}
                                form={CreateContactForm}
                                submit={this.handleEdit} name={name} phone={phone} email={email} remove={this.handleDelete}
                            />
                        }
                    </>
                </Card>
            </Grid>
        )
    }
}

export default Contact
