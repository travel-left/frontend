import React, { Component } from 'react'
import Moment from 'react-moment'
import { apiCall } from '../../util/api'
import TripStatus from '../../util/otherComponents/TripStatus'
import './TripInfo.css'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography';

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
        let {
            name,
            dateStart,
            dateEnd,
            image,
            description,
            status
        } = this.props.trip

        dateStart = dateStart ? dateStart.split('T')[0] : null
        dateEnd = dateEnd ? dateEnd.split('T')[0] : null

        let invited = this.state.travelers.length
        let confirmed = this.state.travelers.filter(t => t.status !== 'INVITED').length

        return (
            <Paper style={{ padding: 16 }}>
                <div className="" style={{ position: 'relative', marginBottom: 32 }}>
                    <img
                        src={image}
                        className="card-img-top TripInfo-image"
                        alt="..."
                    />
                </div>

                <div className="">
                    <div className="d-flex justify-content-between" style={{ marginBottom: 32 }}>
                        <Typography variant="h2">{name}</Typography>
                        <Button size="large" variant="contained" color="primary" onClick={this.handleEditClick} className="float-right" style={{ width: 120, height: 50 }}>open trip</Button>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <p className="TripInfo-description">{description}</p>
                    </div>
                    <div className='TripInfo-details' style={{ marginBottom: 24 }}>
                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                            <Typography variant="h6">Date</Typography>
                            <span className='TripInfo-details-date'><Moment date={dateStart} format="MMM DD" /></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                            <Typography variant="h6">Status</Typography>
                            <span><TripStatus status={status} /></span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                            <Typography variant="h6">Total Invited</Typography>
                            <Chip color="primary" size="small" label={invited} style={{ fontSize: 12, fontWeight: 600 }} />
                        </div>
                        <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: 24 }}>
                            <Typography variant="h6">Total Confirmed</Typography>
                            <Chip color="primary" size="small" label={confirmed} style={{ fontSize: 12, fontWeight: 600 }} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <Button size="large" variant="contained" color="secondary" onClick={this.handleDuplicate} className="float-right" style={{ width: 120, height: 50 }} disabled={this.state.copying}>DUPLICATE</Button>
                        <Button size="large" variant="contained" color="secondary" onClick={this.handleArchive} className="float-right" style={{ width: 120, height: 50 }}>ARCHIVE</Button>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default TripInfo