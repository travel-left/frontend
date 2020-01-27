import React, { Component } from 'react'
import Moment from 'react-moment'
import { apiCall } from '../../util/api'
import TripStatus from '../../util/otherComponents/TripStatus'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import styles from '../../styles/tripInfo'

class TripInfo extends Component {
    state = {
        travelers: [],
        copying: false
    }

    constructor(props) {
        super(props)
        this.getAndSetTravelers()
    }

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.props.trip._id}/travelers`
        )
        this.setState({
            travelers
        })
    }

    // This is used because the component isn't re-rendered each time the trip is changed
    componentDidUpdate(prevProps) {
        if (this.props.trip._id !== prevProps.trip._id) {
            this.getAndSetTravelers()
        }
    }

    handleEditClick = () => {
        this.props.edit(this.props.trip._id)
    }

    handleDuplicate = async () => {
        const { trip, duplicateTrip } = this.props
        this.setState({ copying: true })
        await duplicateTrip(trip._id)
        this.setState({ copying: false })
    }

    handleArchive = async () => {
        const { trip, archiveTrip } = this.props
        archiveTrip(trip._id)
    }

    render() {
        const { name, dateStart, image, description, status } = this.props.trip
        const { classes } = this.props
        const { travelers } = this.state
        const invited = travelers.length
        const confirmed = travelers.filter(t => t.status !== 'INVITED').length

        return (
            <Fade in={true} timeout={700}>
                <Paper className={classes.tripInfo}>
                    <img
                        src={image}
                        className={classes.tripInfoImage}
                        alt="..."
                    />
                    <div className={classes.tripInfoName}>
                        <Typography variant="h2">{name}</Typography>
                    </div>
                    <div className={classes.tripInfoDescription}>
                        {description}
                    </div>
                    <div >
                        <div className={classes.tripInfoData}>
                            <Typography variant="h6">Date</Typography>
                            <span ><Moment date={dateStart ? dateStart.split('T')[0] : null} format="MMM DD" /></span>
                        </div>
                        <div className={classes.tripInfoData}>
                            <Typography variant="h6">Status</Typography>
                            <span><TripStatus status={status} /></span>
                        </div>
                        <div className={classes.tripInfoData}>
                            <Typography variant="h6">Total Invited</Typography>
                            <Chip color="primary" size="small" label={invited} style={{ fontSize: 12, fontWeight: 600 }} />
                        </div>
                        <div className={classes.tripInfoData}>
                            <Typography variant="h6">Total Confirmed</Typography>
                            <Chip color="primary" size="small" label={confirmed} style={{ fontSize: 12, fontWeight: 600 }} />
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        <Button size="large" variant="contained" color="secondary" onClick={this.handleDuplicate} className="float-right" style={{ width: 120, height: 50 }} disabled={this.state.copying}>DUPLICATE</Button>
                        <Button size="large" variant="contained" color="secondary" onClick={this.handleArchive} className="float-right" style={{ width: 120, height: 50 }}>ARCHIVE</Button>
                    </div>
                </Paper>
            </Fade>
        )
    }
}

export default withStyles(styles)(TripInfo)