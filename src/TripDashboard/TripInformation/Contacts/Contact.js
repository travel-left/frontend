import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import LeftModal from '../../../util/otherComponents/LeftModal'
import ContactForm from '../../../Forms/ContactForm'
import LeftCard from '../../../util/otherComponents/LeftCard'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    contact: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    contactName: {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: theme.palette.grey["A700"],
        letterSpacing: "0",
    },
    contactInfo: {
        fontFamily: "Roboto",
        fontSize: "12px",
        color: theme.palette.grey["A600"],
        letterSpacing: "0",
    },
    tele: {
        fontFamily: "Roboto",
        fontSize: "12px",
        color: theme.palette.grey["A600"],
        letterSpacing: "0",
        width: theme.spacing(7)
    }
})

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
        const { name, phone, email, image, share, classes } = this.props
        const { isEditContactModalOpen } = this.state

        return (
            <LeftCard>
                <Image diameter={64} src={image} name={name} />
                <div className={classes.contact}>
                    {name && <span className={classes.contactName}>{name}</span>}
                    {phone && <a className={classes.contactInfo} href={`tel:${phone}`}>{phone}</a>}
                    {email && <span className={classes.contactInfo} >{email}</span>}
                </div>
                <>
                    {!share ?
                        <LeftFab
                            id="contact-edit-button"
                            onClick={this.openModal}
                        >
                            Edit
                    </LeftFab> :
                        <a className={classes.tele} href={`tel:${phone}`}>
                            {phone && <PhoneInTalkIcon fontSize="large" color="primary" />}
                        </a>
                    }
                    {
                        isEditContactModalOpen && <LeftModal
                            isOpen={isEditContactModalOpen}
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
            </LeftCard>
        )
    }
}

export default withStyles(styles)(Contact)
