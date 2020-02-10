import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftCard from '../../../util/otherComponents/LeftCard'
import RemoveCoordinatorForm from '../../../Forms/RemoveCoordinatorForm'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

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
        editCoordinator: false,
        showModal: false
    }
    handleEdit = updateObject => {
        this.props.update(this.props._id, updateObject)
    }

    handleDelete = () => {
        this.props.remove(this.props._id)
    }

    toggleModal = () => (this.setState({ showModal: !this.state.showModal }))

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
                <LeftFab
                    id='coordinator-edit-button'
                    onClick={this.toggleModal}
                >
                    Edit
                    </LeftFab>
            ) : <a className={classes.tele} href={`tel:${phone}`}>
                    {phone && <PhoneInTalkIcon fontSize="large" color="primary" />}
                </a>

        return (
            <>
                <LeftCard>
                    <Image diameter={64} src={image} name={name} />
                    <div className={classes.coordinator}>
                        {name && <span className={classes.coordinatorName}>{name}</span>}
                        {title && <Typography variant="caption" id="coordinator-name">{title}</Typography>}
                        {phone && <Typography variant="caption" id="coordinator-phone">{phone}</Typography>}
                        {email && <Typography variant="caption" id="coordinator-email">{email}</Typography>}
                    </div>
                    {removeButton}
                </LeftCard>
                <>
                    {
                        this.state.showModal && <LeftModal
                            closeModal={this.toggleModal}
                            title='Remove coordinator from trip'
                            submit={this.handleDelete}
                            form={RemoveCoordinatorForm}
                        />
                    }
                </>
            </>
        )
    }
}

export default withStyles(styles)(Coordinator)
