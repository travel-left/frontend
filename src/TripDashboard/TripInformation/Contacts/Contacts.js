import React, { Component } from 'react'
import Contact from './Contact'
import { apiCall } from '../../../util/api'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Snack from '../../../util/Snack'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'
import CreateContactForm from './CreateContactForm'

export default class Contacts extends Component {
    TRIP_ID = this.props.tripId

    state = {
        contacts: [],
        isNewContactModalOpen: false,

        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }

    constructor(props) {
        super(props)
        this.getContacts()
    }

    closeModal = () => (this.setState({ isNewContactModalOpen: false }))
    openModal = () => (this.setState({ isNewContactModalOpen: true }))

    getContacts = async () => {
        let contacts = await apiCall(
            'get',
            `/api/trips/${this.TRIP_ID}/contacts`
        )
        this.setState({ contacts })
    }

    updateContact = async (contactId, updateObject) => {
        try {
            await apiCall(
                'put',
                `/api/trips/${this.TRIP_ID}/contacts/${contactId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getContacts()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    createContact = async newContact => {
        try {
            await apiCall(
                'post',
                `/api/trips/${this.TRIP_ID}/contacts`,
                newContact,
                true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getContacts()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    deleteContact = async contactId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.TRIP_ID}/contacts/${contactId}`, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getContacts()
        } catch (err) {
            this.setState({
                snack: {
                    show: true,
                    variant: 'error',
                    message: 'An error occurred.'
                }
            })
        }
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))

    render() {
        const { contacts } = this.state

        let contactList = contacts.map(contact =>
            <Contact
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                image={contact.image}
                _id={contact._id}
                remove={this.deleteContact}
                update={this.updateContact}
            ></Contact>
        )

        return (
            <div style={{ marginTop: 64 }}>
                <Typography variant="h2" style={{ marginBottom: 16 }}>Trip Contacts</Typography>
                <Grid container spacing={2}>
                    {contactList}
                    <Grid item  >
                        <Grid item className='d-flex justify-content-around align-items-center animated fadeIn' style={{ height: 100, width: 420, marginTop: 16, marginRight: 32, marginBottom: 16 }}>
                            <Fab onClick={this.openModal} color="secondary" variant="extended" style={{ width: 96, height: 32, fontSize: 12, fontWeight: 600, color: 'white' }}>
                                Add New
                        </Fab>
                        </Grid>
                    </Grid>
                    {
                        this.state.isNewContactModalOpen && <LeftModal
                            isOpen={this.state.isNewContactModalOpen}
                            toggleModal={this.closeModal}
                            title='Add a contact to this trip'
                            submit={this.createContact}
                            form={CreateContactForm}
                        />
                    }
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
