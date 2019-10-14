import React, { Component } from 'react'
import TripImageForm from './TripImageForm'
import TripDatesForm from './TripDatesForm'
import { apiCall } from '../../util/api'
import TripStatusForm from './TripStatusForm'
import Fab from '@material-ui/core/Fab'
import NewShareTrip from '../../util/otherComponents/NewShareTrip'
import SendIcon from '@material-ui/icons/Send'
import './Cover.css'
import Snack from '../../util/Snack'

class Cover extends Component {
    tripId = this.props.currentTrip._id
    state = {
        travelers: [],
        snack: {
            show: false,
            variant: '',
            message: ''
        },
        isShareTripOpen: false
    }

    constructor(props) {
        super(props)

        this.getAndSetTravelers()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    toggleSharetTripModal = () => (this.setState(prevState => ({
        isShareTripOpen: !prevState.isShareTripOpen
    })))
    closeSharetTripModal = () => (this.setState(prevState => ({
        isShareTripOpen: !prevState.isShareTripOpen, snack: {
            show: true,
            variant: 'success',
            message: 'Copied!'
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
            return this.props.setCurrentTrip(data)
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
        console.log(text)
        console.log(phones)
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
            <div className="row">
                <div
                    className="col-12 d-flex flex-column justify-content-end px-5 py-2 Cover-image"
                    style={{
                        backgroundImage: `url(${currentTrip.image})`,
                        height: '183px',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: '3px'
                    }}
                >
                    <div className="row justify-content-between">
                        <TripStatusForm
                            submit={this.updateTrip}
                            status={currentTrip.status}
                        />
                        <div className="pr-2">
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
                    <div className="row justify-content-between">
                        <div className="btn">
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
            </div>
        )
    }
}

export default Cover
