import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import Fab from '@material-ui/core/Fab'
import './Coordinator.css'
import Card from '@material-ui/core/Card';
import LeftModal from '../../../util/otherComponents/LeftModal'
import RemoveCoordinatorForm from './RemoveCoordinatorForm';
import Grid from '@material-ui/core/Grid'


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
            currentUserId !== _id ? (
                <>
                    <Fab onClick={() => this.openModal('editCoordinator')} variant="extended" style={{ width: 54, height: 25, backgroundColor: '#475561', fontSize: 12, fontWeight: 600, color: 'white' }}>
                        Edit
                    </Fab>
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
            ) : <span style={{ width: '54px', }}></span>

        return (
            <Grid item xs={12} md={6}>
                <Card className='d-flex justify-content-around align-items-center animated fadeIn' style={{ height: 100, width: 420, marginTop: 16, marginRight: 32, marginBottom: 16 }}>
                    <Image src={image} diameter="48px" name={name} />
                    <div className="d-flex flex-column justify-content-center">
                        {name && <span className="Coordinator-name">{name}</span>}
                        {title && <span className="Coordinator-info">{title}</span>}
                        {phone && <span className="Coordinator-info">{phone}</span>}
                        {email && <span className="Coordinator-info">{email}</span>}
                    </div>
                    {removeButton}
                </Card>
            </Grid>
        )
    }
}

export default Coordinator
