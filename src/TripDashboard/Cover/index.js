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
                        <div className="" >
                            <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>{invited} Invited</Typography>{' '}
                            <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>{confirmed} Confirmed</Typography>
                        </div>
                        <div className="hover" id="tripDates" onClick={() => this.openModal('isTripDatesOpen')}>
                            <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>
                                <Moment date={currentTrip.dateStart.split('T')[0]} format="MMMM DD" />{' - '}
                            </Typography>
                            <Typography variant="h1" style={{ color: 'white', display: 'inline' }}>
                                <Moment date={currentTrip.dateEnd.split('T')[0]} format="MMMM DD" />
                            </Typography>
                        </div>
                        {this.state.isTripDatesOpen && <LeftModal
                            isOpen={this.state.isTripDatesOpen}
                            toggleModal={() => this.closeModal('isTripDatesOpen')}
                            title='Change trip dates'
                            form={ChangeTripDatesForm}
                            submit={this.updateTrip}
                            dateStart={moment(currentTrip.dateStart).format('MM-DD-YYYY')}
                            dateEnd={moment(currentTrip.dateEnd).format('MM-DD-YYYY')}
                        />}
                        <Typography variant="h1" className='hover' style={{ color: 'white', display: 'inline' }} onClick={() => this.openModal('isChangeCoverOpen')}>
                            Change Cover Photo
                        </Typography>

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
