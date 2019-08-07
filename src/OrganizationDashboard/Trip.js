import React, { Component } from 'react'
import Moment from 'react-moment'

class Trip extends Component {
    handleClick = () => {
        this.props.click(this.props.id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props.id)
    }

    render() {
        let { name, image, dateStart, status } = this.props
        let statusColor = 'primary'
        switch (status) {
            case 'LEFT':
                statusColor = 'left'
                break
            case 'PLANNING':
                statusColor = 'secondary'
                break
            default:
                break
        }
        return (
            <div
                className="card my-1 shadow mx-2 mx-md-0 my-2 hover border-0 d-md-flex flex-row justify-content-around d-none animated fadeIn"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                style={{ maxHeight: '13vh' }}
            >
                <div className="col-md-3 px-0">
                    <img src={image} className="card-img" alt="..." style={{ maxHeight: '13vh' }} />
                </div>
                <div className="col-4 col-md-4 d-flex align-items-center">
                    <p className="card-text h4">{name}</p>
                </div>
                <div className="col-4 col-md-2 offset-md-1 d-flex align-items-center">
                    <p className="card-text text-dark pl-3">
                        <Moment date={dateStart} format="MMM DD" />
                    </p>
                </div>
                <div className="col-4 col-md-2 d-flex align-items-center justify-content-center">
                    <span className={`badge badge-${statusColor} badge-pill text-light text-uppercase px-3 py-1`}>
                        {status}
                    </span>
                </div>
            </div>
        )
    }
}

export default Trip
