import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftCard from '../../../util/otherComponents/LeftCard'
import RemoveCoordinatorForm from '../../../Forms/RemoveCoordinatorForm'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    coordinator: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    coordinatorName: {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: theme.palette.grey["A700"],
        letterSpacing: "0",
    },
    coordinatorInfo: {
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

class Coordinator extends Component {

    state = {
        editCoordinator: false
    }
    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    closeModal = modal => (this.setState({ [modal]: false }))
    openModal = modal => (this.setState({ [modal]: true }))

    render() {
        const {
            email,
            image,
            name,
            phone,
            title,
            currentUserId,
            _id,
            classes,
            share
        } = this.props

        const { editCoordinator } = this.state

        const removeButton =
            (currentUserId != _id && !share) ? (
                <>
                    <LeftFab
                        id='coordinator-edit-button'
                        onClick={() => this.openModal('editCoordinator')}
                    >
                        Edit
                    </LeftFab>
                    {
                        editCoordinator && <LeftModal
                            isOpen={editCoordinator}
                            toggleModal={() => this.closeModal('editCoordinator')}
                            title='Remove coordinator from trip'
                            submit={this.handleDelete}
                            form={RemoveCoordinatorForm}
                        />
                    }
                </>
            ) : <a className={classes.tele} href={`tel:${phone}`}>
                    {phone && <PhoneInTalkIcon fontSize="large" color="primary" />}
                </a>

        return (
            <LeftCard>
                <Image diameter={64} src={image} name={name} />
                <div className={classes.coordinator}>
                    {name && <span className={classes.coordinatorName}>{name}</span>}
                    {title && <span className={classes.coordinatorInfo}>{title}</span>}
                    {phone && <span className={classes.coordinatorInfo}>{phone}</span>}
                    {email && <span className={classes.coordinatorInfo}>{email}</span>}
                </div>
                {removeButton}
            </LeftCard>
        )
    }
}

export default withStyles(styles)(Coordinator)
