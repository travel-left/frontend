import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import Fab from '@material-ui/core/Fab'
import NewShareTrip from '../../util/otherComponents/NewShareTrip'
import SendIcon from '@material-ui/icons/Send'
import './Cover.css'
import TripStatus from '../../util/otherComponents/TripStatus'
import LeftModal from '../../util/otherComponents/LeftModal'
import ChangeTripStatusForm from '../../Forms/ChangeTripStatusForm'
import ChangeTripDatesForm from '../../Forms/ChangeTripDatesForm'
import ChangeCoverPhotoForm from '../../Forms/ChangeCoverPhotoForm'
import Moment from 'react-moment'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Snack from '../../util/otherComponents/Snack'
import LeftFab from '../../util/otherComponents/LeftFab'
import Chip from '@material-ui/core/Chip';

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
        isChangeCoverOpen: false
    }

    constructor(props) {
        super(props)
        this.getAndSetTravelers()
    }

    closeSnack = () => (this.setState({ snack: { show: false } }))
    closeModal = modal => (this.setState({ [modal]: false }))
    openModal = modal => (this.setState({ [modal]: true }))

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

    copiedLink = () => {
        this.setState({
            snack: {
                show: true,
                variant: 'success',
                message: 'Copied!'
            }
        })
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
                    <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 32 }}>
                        <TripStatus onClick={() => this.openModal('isTripStatusOpen')} status={currentTrip.status} fab></TripStatus>
                        {this.state.isTripStatusOpen && <LeftModal
                            isOpen={this.state.isTripStatusOpen}
                            toggleModal={() => this.closeModal('isTripStatusOpen')}
                            title='Change trip status'
                            form={ChangeTripStatusForm}
                            submit={this.updateTrip}
                            status={currentTrip.status}
                        />}
                        <div className="">
                            <Fab onClick={() => this.openModal('isShareTripOpen')} color="primary" className="share-trip-button">
                                <SendIcon style={{ color: 'white' }} fontSize="large" />
                            </Fab>
                            {this.state.isShareTripOpen && <LeftModal
                                isOpen={this.state.isShareTripOpen}
                                toggleModal={() => this.closeModal('isShareTripOpen')}
                                title='Share trip'
                                tripId={currentTrip._id}
                                submit={this.copiedLink}
                                form={NewShareTrip}
                            />}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center" >
                        <LeftFab text={`${invited} Invited
                            ${confirmed} Confirmed`}></LeftFab>
                        <LeftFab onClick={() => this.openModal('isTripDatesOpen')} text={`${moment(currentTrip.dateStart.split('T')[0]).format('MMMM DD')} - 
                            ${moment(currentTrip.dateEnd.split('T')[0]).format('MMMM DD')}`}
                            className="hover"
                            id="tripDates"
                            style={{
                                color: "white",
                                fontSize: 14,
                                backgroundColor: '#475561',
                                height: 32,
                                paddingLeft: 4,
                                paddingRight: 4
                            }}
                            fab>
                        </LeftFab>
                        {this.state.isTripDatesOpen && <LeftModal
                            isOpen={this.state.isTripDatesOpen}
                            toggleModal={() => this.closeModal('isTripDatesOpen')}
                            title='Change trip dates'
                            form={ChangeTripDatesForm}
                            submit={this.updateTrip}
                            dateStart={moment(currentTrip.dateStart).format('MM-DD-YYYY')}
                            dateEnd={moment(currentTrip.dateEnd).format('MM-DD-YYYY')}
                        />}

                        <LeftFab onClick={() => this.openModal('isChangeCoverOpen')} text="Change Cover Photo"
                            style={{
                                color: "white",
                                fontSize: 14,
                                backgroundColor: '#475561',
                                height: 32,
                                paddingLeft: 4,
                                paddingRight: 4
                            }} fab
                        ></LeftFab>

                        {this.state.isChangeCoverOpen && <LeftModal
                            isOpen={this.state.isChangeCoverOpen}
                            toggleModal={() => this.closeModal('isChangeCoverOpen')}
                            title='Change cover photo'
                            form={ChangeCoverPhotoForm}
                            submit={this.updateTrip}
                        />}
                    </div>
                </div>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </>
        )
    }
}

export default Cover
