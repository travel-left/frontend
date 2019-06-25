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
            <div className="card my-1 shadow py-md-2 mx-2 mx-md-0 px-2 px-md-0 py-2 hover" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-3 pl-md-4 py-2 p-md-0">
                        <img src={image} className="card-img" alt="..." style={{ minHeight: '80px', maxHeight: '90px' }} />
                    </div>
                    <div className="col-4 col-md-3 hover">
                        <p className="card-text">
                            {name}
                        </p>
                    </div>
                    <div className="col-4 col-md-3">
                        <p className="card-text text-dark">
                            <Moment date={dateStart} format="MMM DD" /> {' - '}
                            <Moment date={dateEnd} format="MMM DD" />
                        </p>
                    </div>
                    <div className="col-4 col-md-3">
                        <span class="badge badge-secondary badge-pill text-light">
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trip
