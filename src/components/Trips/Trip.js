import React, { Component } from 'react'
import Moment from 'react-moment'

class Trip extends Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.click(this.props.id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props.id)
    }

    render() {
        let { name, image, dateStart, dateEnd, status } = this.props

        return (
            <div className="card my-1 shadow mx-2 mx-md-0 my-2 hover border-0 d-md-flex flex-row justify-content-around d-none" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                <div className="col-md-3 px-0">
                    <img src={image} className="card-img" alt="..." />
                </div>
                <div className="col-4 col-md-4 d-flex align-items-center">
                    <p className="card-text h4">
                        {name}
                    </p>
                </div>
                <div className="col-4 col-md-2 offset-md-1 d-flex align-items-center">
                    <p className="card-text text-dark pl-3">
                        <Moment date={dateStart} format="MMM DD" />
                    </p>
                </div>
                <div className="col-4 col-md-2 d-flex align-items-center justify-content-center">
                    <span class="badge badge-secondary badge-pill text-light text-uppercase px-3 py-1">
                        {status}
                    </span>
                </div>
            </div>
        )
    }
}

export default Trip
