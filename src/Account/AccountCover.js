import React, { Component } from 'react'
import Image from '../util/otherComponents/Image'
import Typography from '@material-ui/core/Typography'
import ChangeCoverPhotoForm from '../Forms/ChangeCoverPhotoForm'
import LeftModal from '../util/otherComponents/LeftModal'
import Snack from '../util/otherComponents/Snack'
import { apiCall } from '../util/api'

export default class AccountCover extends Component {
    state = {
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isChangeImageOpen: false
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = () => (this.setState({ isChangeImageOpen: false }))
    openModal = () => (this.setState({ isChangeImageOpen: true }))

    updateCoordinator = async updateObject => {
        try {
            const data = await apiCall(
                'put',
                `/api/coordinators/${this.props.user._id}`,
                updateObject
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.setCurrentUser(data)
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
        const { image, name } = this.props.user
        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <Image src={image} diameter="128px" name={name} upload handleUpload={this.openModal} />

                    {this.state.isChangeImageOpen && <LeftModal
                        isOpen={this.state.isChangeImageOpen}
                        toggleModal={() => this.closeModal('isChangeImageOpen')}
                        title='Change photo'
                        form={ChangeCoverPhotoForm}
                        submit={this.updateCoordinator}
                    />}
                </div>
                <Typography variant="h3">Welcome, {name}</Typography>
                <Typography variant="subtitle1" style={{ marginTop: 16 }}>Manage your info, payment settings, and organization.</Typography>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
