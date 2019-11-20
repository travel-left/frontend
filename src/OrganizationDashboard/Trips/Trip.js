import React, { Component } from 'react'
import Moment from 'react-moment'
import TripStatus from '../../util/otherComponents/TripStatus'
import './Trip.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            <Paper className="row mx-2 mx-xl-0 my-2 hover border-0 d-flex flex-row justify-content-around animated fadeIn Trip"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}>
                <div className="col-md-0 col-xl-2 px-0">
                    <img
                        src={image}
                        className="card-img Trip-image d-none d-xl-block"
                        alt="..."
                    />
                </div>
                <div className="col-4 col-xl-4 d-flex align-items-center">
                    <Typography variant="h2">{name}</Typography>
                </div>
                <div className="col-4 col-xl-2 offset-xl-1 d-flex align-items-center justify-content-center">
                    <span className="Trip-date d-flex align-items-center justify-content-center">
                        <Moment date={dateStart} format="MMM DD" />
                    </span>
                </div>
                <div className="col-4 col-xl-3 d-flex align-items-center justify-content-center">
                    <TripStatus status={status} />
                </div>
            </Paper>
        )
    }
}

export default Trip
