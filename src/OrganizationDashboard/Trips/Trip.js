import React, { Component } from 'react'
import Moment from 'react-moment'
import TripStatus from '../../util/otherComponents/TripStatus'
import './Trip.css'

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
            <div
                className="mx-2 mx-md-0 my-2 hover border-0 d-md-flex flex-row justify-content-around animated fadeIn Trip"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
            >
                <div className="col-md-2 px-0">
                    <img
                        src={image}
                        className="card-img Trip-image"
                        alt="..."
                    />
                </div>
                <div className="col-4 col-md-4 d-flex align-items-center">
                    <p className="card-text Trip-name">{name}</p>
                </div>
                <div className="col-4 col-md-2 offset-md-1 d-flex align-items-center justify-content-center">
                    <span className="Trip-date d-flex align-items-center justify-content-center">
                        <Moment date={dateStart} format="MMM DD" />
                    </span>
                </div>
                <div className="col-4 col-md-3 d-flex align-items-center justify-content-center">
                    <TripStatus status={status} />
                </div>
            </div>
        )
    }
}

export default Trip
