import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../util/api'
import Fab from '@material-ui/core/Fab'
import NewShareTrip from '../../util/otherComponents/NewShareTrip'
import SendIcon from '@material-ui/icons/Send'
import './Cover.css'
import Snack from '../../util/Snack'
import TripStatus from '../../util/otherComponents/TripStatus';
import LeftModal from '../../util/otherComponents/LeftModal';
import ChangeTripStatusForm from './ChangeTripStatusForm'

class Cover extends Component {
    tripId = this.props.currentTrip._id
    state = {
        travelers: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isShareTripOpen: false,
        isTripStatusOpen: false,
        isTripDatesOpen: false,
        isChangeCoverOoen: false
    }

    constructor(props) {
        super(props)

        this.getAndSetTravelers()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    toggleSharetTripModal = () => (this.setState(prevState => ({
        isShareTripOpen: !prevState.isShareTripOpen
    })))
    toggleTripStatusModal = () => (this.setState({
        isTripStatusOpen: true
    }))
    toggleTripDatesModal = () => (this.setState(prevState => ({
        isTripDatesOpen: !prevState.isTripDatesOpen
    })))
    toggleChangeCoverModal = () => (this.setState(prevState => ({
        isChangeCoverOpen: !prevState.isChangeCoverOoen
    })))
    closeSharetTripModal = () => (this.setState({
        isShareTripOpen: false
    }))
    closeTripStatusModal = () => (this.setState({
        isTripStatusOpen: false
    }))

    closeTripDatesModal = () => (this.setState(prevState => ({
        isTripDatesOpen: !prevState.isTripDatesOpen, snack: {
            show: true,
            variant: 'success',
            message: 'Updated!'
        }
    })))
    closeChangeCoverModal = () => (this.setState(prevState => ({
        isChangeCoverOpen: !prevState.isChangeCoverOpen, snack: {
            show: true,
            variant: 'success',
            message: 'Updated!'
        }
    })))

    updateTrip = async updateObject => {
        try {
            const data = await apiCall(
                'put',
                `/api/trips/${this.tripId}`,
                updateObject, true
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
            this.props.setCurrentTrip(data)
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

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.tripId}/travelers`
        )
        this.setState({
            travelers
        })
    }



    textSelectedTravelers = async (text, phones) => {
        try {
            await apiCall('post', '/api/communicate/text', {
                body: text, phones
            }, true)
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
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

    emailSelectedTravelers = async (subject, body, emails) => {
        try {
            await apiCall('post', '/api/communicate/email', {
                subject,
                body,
                emails
            })
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })
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
        let currentTrip = this.props.currentTrip
        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED').length

        return (
            <>
                <div
                    className="d-flex flex-column justify-content-end Cover-image"
                    style={{
                        backgroundImage: `url(${currentTrip.image})`,
                        height: '183px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '3px',
                        padding: 16
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <TripStatus onClick={this.toggleTripStatusModal} status={currentTrip.status} fab></TripStatus>
                        {this.state.isTripStatusOpen && <LeftModal
                            isOpen={this.state.isTripStatusOpen}
                            toggleModal={this.closeTripStatusModal}
                            title='Change trip status'
                            form={ChangeTripStatusForm}
                            submit={this.updateTrip}
                            status={currentTrip.status}
                        />}
                        <div className="">
                            <Fab onClick={this.toggleSharetTripModal} color="primary">
                                <SendIcon style={{ color: 'white' }} fontSize="large" />
                            </Fab>
                            {this.state.isShareTripOpen && <NewShareTrip
                                isOpen={this.state.isShareTripOpen}
                                toggleModal={this.closeSharetTripModal}
                                tripId={currentTrip._id}
                            />}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                            <h5 className="d-inline Cover-bottom-row">
                                {invited} Invited
                            </h5>
                            <h5 className="d-inline ml-5 Cover-bottom-row">
                                {confirmed} Confirmed
                            </h5>
                        </div>
                        <TripDatesForm
                            dateStart={currentTrip.dateStart}
                            dateEnd={currentTrip.dateEnd}
                            submit={this.updateTrip}
                        />
                        <TripImageForm
                            image={currentTrip.image}
                            submit={this.updateTrip}
                        />
                    </div>
                </div>
                <div className="col-3" />
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
}

export default Cover
