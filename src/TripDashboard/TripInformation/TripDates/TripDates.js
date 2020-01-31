import React, { Component } from 'react'
import TripDate from './TripDate'
import { apiCall } from '../../../util/api'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Snack from '../../../util/otherComponents/Snack'
import LeftModal from '../../../util/otherComponents/LeftModal'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import TripDateForm from '../../../Forms/TripDateForm'
import LeftFab from '../../../util/otherComponents/LeftFab'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    tripDates: {
        marginTop: theme.spacing(4),
    },
    tripDateList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(4, 2, 2, 2),
        maxWidth: theme.spacing(68),
        paddingBottom: props => props.share && theme.spacing(2)
    },
    addNew: {
        display: 'flex',
        justifcontent: 'center',
        padding: theme.spacing(2)
    }
})

class TripDates extends Component {
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
        const { classes, share, dateStart } = this.props
        const { tripDates, isNewTripDateModalOpen, snack } = this.state

        const sortedTripDates = tripDates.sort((f, s) => (f.date > s.date ? 1 : -1))
        const tripDatesList = sortedTripDates.map(date =>
            <TripDate
                date={date.date}
                name={date.name}
                type={date.type}
                update={this.updateTripDate}
                remove={this.deleteTripDate}
                _id={date._id}
                share={share}
            ></TripDate>)
        return (
            <div className={classes.tripDates}>
                <Typography variant="h2">Important Dates</Typography>
                <Grid item xs={12} sm={8} md={6} >
                    <Card className={classes.tripDateList}>
                        {tripDatesList}
                        {!share &&
                            <div className={classes.addNew}>
                                <LeftFab
                                    onClick={this.openModal}
                                    id="add-new-trip-date-button"
                                    color="secondary"
                                >
                                    Add New
                                </LeftFab>
                                {
                                    isNewTripDateModalOpen && <LeftModal
                                        isOpen={isNewTripDateModalOpen}
                                        toggleModal={this.closeModal}
                                        title='Add an important date'
                                        submit={this.createTripDate}
                                        date={moment(dateStart).format('MM-DD-YYYY')}
                                        form={TripDateForm}
                                    />
                                }
                            </div>}
                    </Card>
                </Grid>
                {snack.show && <Snack open={snack.show} message={snack.message} variant={snack.variant} onClose={this.closeSnack}></Snack>}
            </div>
        )
    }
}

export default withStyles(styles)(TripDates)