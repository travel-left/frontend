import React, { Component } from 'react'
import Contact from './Contact'
import { apiCall } from '../../../util/api'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import LeftModal from '../../../util/otherComponents/LeftModal'
import ContactForm from '../../../Forms/ContactForm'
import LeftItem from '../../../util/otherComponents/LeftItem'
import Snack from '../../../util/otherComponents/Snack'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'

const styles = theme => ({
    contactSection: {
        marginTop: theme.spacing(4)
    },
    contactList: {
        marginTop: theme.spacing(2)
    }
})

class Contacts extends Component {
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
    closeSnack = () => (this.setState({ snack: { show: false } }))

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
                `/api/trips/${this.TRIP_ID}/contacts/${contactId}`,
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



    render() {
        const { classes } = this.props
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
                share={this.props.share}
            ></Contact>
        )

        const newContactButton = <LeftItem height={100}>
            <LeftFab
                id="add-new-contact-button"
                onClick={this.openModal}
                color="secondary">
                ADD NEW
            </LeftFab>
        </LeftItem>

        !this.props.share && contactList.splice(1, 0, newContactButton)

        return (
            <div className={classes.contactSection}>
                <Typography variant="h2" style={{ marginBottom: 16 }}>Contacts</Typography>
                <Fade in={true} timeout={700}>
                    <Grid container className={classes.contactList}>
                        {contactList}
                        {this.state.isNewContactModalOpen && <LeftModal
                            isOpen={this.state.isNewContactModalOpen}
                            toggleModal={this.closeModal}
                            title='Add a contact'
                            submit={this.createContact}
                            form={ContactForm}
                        />
                        }
                    </Grid>
                </Fade>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(Contacts)