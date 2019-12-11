import React, { Component } from 'react'
import Moment from 'react-moment'
import TripStatus from '../../util/otherComponents/TripStatus'
import './Trip.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

class Trip extends Component {
    handleClick = () => {
        this.props.click(this.props.id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props.id)
    }

    render() {
        let { name, image, dateStart, status } = this.props

        return (
            <Paper className="hover d-flex align-items-center justify-content-around animated fadeIn Trip"
                style={{ marginTop: 8, marginBottom: 8 }}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
            >
                <Grid item xs={3} >
                    <img
                        src={image}
                        className="card-img Trip-image"
                        alt="..."
                    />
                </Grid>

                <Grid item xs={3} className=''>
                    <Typography variant="h2">{name}</Typography>
                </Grid>

                <Grid item xs={3} className='text-center'>
                    <Moment date={dateStart} format="MMM DD" className="Trip-date" />
                </Grid>

                <Grid item xs={3} className='text-center'>
                    <TripStatus status={status} />
                </Grid>

            </Paper>
        )
    }
}

export default Trip
