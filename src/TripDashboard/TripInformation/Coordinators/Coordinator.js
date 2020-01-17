import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import Fab from '@material-ui/core/Fab'
import './Coordinator.css'
import LeftModal from '../../../util/otherComponents/LeftModal'
import LeftCardNew from '../../../util/otherComponents/LeftCardNew'
import RemoveCoordinatorForm from '../../../Forms/RemoveCoordinatorForm'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import LeftFab from '../../../util/otherComponents/LeftFab'

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
        let {
            email,
            image,
            name,
            phone,
            title,
            currentUserId,
            _id
        } = this.props

        const removeButton =
            (currentUserId != _id && !this.props.share) ? (
                <>
                    <LeftFab
                        id='coordinator-edit-button'
                        onClick={() => this.openModal('editCoordinator')}
                    >Edit
                    </LeftFab>
                    {
                        this.state.editCoordinator && <LeftModal
                            isOpen={this.state.editCoordinator}
                            toggleModal={() => this.closeModal('editCoordinator')}
                            title='Remove coordinator from trip'
                            submit={this.handleDelete}
                            form={RemoveCoordinatorForm}
                        />
                    }
                </>
            ) : <a className="Coordinator-info" href={`tel:${phone}`} style={{ width: '54px', }}>
                    {phone && <PhoneInTalkIcon fontSize="large" color="primary" />}
                </a>

        return (
            <LeftCardNew height={100}>
                <Image diameter={64} src={image} name={name} />
                <div className="d-flex flex-column justify-content-center">
                    {name && <span className="Coordinator-name">{name}</span>}
                    {title && <span className="Coordinator-info">{title}</span>}
                    {phone && <span className="Coordinator-info">{phone}</span>}
                    {email && <span className="Coordinator-info">{email}</span>}
                </div>
                {removeButton}
            </LeftCardNew>
        )
    }
}

export default Coordinator
