import React, { Component } from 'react'
import TripDate from './TripDate'
import { apiCall } from '../../../util/api'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Snack from '../../../util/otherComponents/Snack'
import LeftModal from '../../../util/otherComponents/LeftModal'
import Fab from '@material-ui/core/Fab'
import moment from 'moment'
import LeftCardNew from '../../../util/otherComponents/LeftCardNew'
import TripDateForm from '../../../Forms/TripDateForm'

export default class TripDates extends Component {
    TRIP_ID = this.props.tripId

    state = {
        tripDates: [],
        isNewTripDateModalOpen: false,
        snack: {
            show: false,
            variant: '',
            message: ''
        },
    }

    constructor(props) {
        super(props)
        this.getTripDates()
    }

    getTripDates = async () => {
        let tripDates = await apiCall('get', `/api/trips/${this.TRIP_ID}/tripDates`)
        this.setState({ tripDates })
    }

    updateTripDate = async (tripDateId, updateObject) => {
        updateObject.type = updateObject.category.value.toUpperCase()
        try {
            await apiCall(
                'put',
                `/api/trips/${this.TRIP_ID}/tripDates/${tripDateId}`,
                updateObject
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getTripDates()
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

    createTripDate = async tripDate => {
        try {
            tripDate.type = tripDate.category.value.toUpperCase()
            await apiCall(
                'post',
                `/api/trips/${this.TRIP_ID}/tripDates`,
                tripDate
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getTripDates()
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

    deleteTripDate = async tripDateId => {
        try {
            await apiCall(
                'delete',
                `/api/trips/${this.TRIP_ID}/tripDates/${tripDateId}`,
            )
            this.setState({
                snack: {
                    show: true,
                    variant: 'success',
                    message: 'Success!'
                }
            })

            this.getTripDates()
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

    closeModal = () => (this.setState({ isNewTripDateModalOpen: false }))
    openModal = () => (this.setState({ isNewTripDateModalOpen: true }))
    closeSnack = () => (this.setState({ snack: { show: false } }))

    render() {
        const tripDates = this.state.tripDates.sort((f, s) => (f.date > s.date ? 1 : -1))
        const tripDatesList = tripDates.map(date =>
            <TripDate
                date={date.date}
                name={date.name}
                type={date.type}
                update={this.updateTripDate}
                remove={this.deleteTripDate}
                _id={date._id}
            ></TripDate>)
        return (
            <div style={{ marginTop: 64 }}>
                <Typography variant="h2" style={{ marginBottom: 16, marginTop: 16 }}>Trip Dates</Typography>
                <Grid container spacing={2}>
                    <LeftCardNew>
                        <div className="d-flex flex-column flex-grow-1">
                            {tripDatesList}
                            <div className='d-flex justify-content-center' style={{ paddingBottom: 16, paddingTop: 16 }}>
                                <Fab onClick={this.openModal} color="secondary" variant="extended" style={{ width: 96, height: 32, fontSize: 12, fontWeight: 600, color: 'white' }}>
                                    Add New
                                </Fab>
                                {
                                    this.state.isNewTripDateModalOpen && <LeftModal
                                        isOpen={this.state.isNewTripDateModalOpen}
                                        toggleModal={this.closeModal}
                                        title='Add a trip date'
                                        submit={this.createTripDate}
                                        date={moment(this.props.dateStart).format('MM-DD-YYYY')}
                                        form={TripDateForm}
                                    />
                                }
                            </div>
                        </div>
                    </LeftCardNew>
                </Grid>
                {this.state.snack.show && <Snack open={this.state.snack.show} message={this.state.snack.message} variant={this.state.snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}
