import React, { Component } from 'react'
import Image from '../util/otherComponents/Image'
import Typography from '@material-ui/core/Typography'
import ChangeAccountPhotoForm from '../Forms/ChangeAccountPhotoForm'
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
        showModal: false
    }

    closeSnack = () => this.setState({ snack: { show: false } })
    toggleModal = () => this.setState({ showModal: !this.state.showModal })

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
            <>
                <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                        <Image src={image} diameter="128px" name={name} upload handleUpload={this.toggleModal} />
                    </div>
                    <Typography variant="h3">Welcome, {name}</Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 16 }}>Manage your info, payment settings, and organization.</Typography>

                </div>

                {/* MODALS */}
                <>
                    {this.state.showModal && <LeftModal
                        closeModal={this.toggleModal}
                        title='Change photo'
                        form={ChangeAccountPhotoForm}
                        submit={this.updateCoordinator}
                    />}
                    {this.state.snack.show && <Snack
                        open={this.state.snack.show}
                        message={this.state.snack.message}
                        variant={this.state.snack.variant}
                        onClose={this.closeSnack}></Snack>
                    }
                </>
            </>
        )
    }
}
