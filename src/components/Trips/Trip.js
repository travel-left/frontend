import React, { Component } from 'react'

class Trip extends Component {
    constructor(props) {
        super(props)
    }

    onTripClick = () => {
        this.props.clicked(this.props.id)
    }

    render() {
        let { name, image, date, status } = this.props

        return (
            <div className="card my-1 shadow py-md-2 mx-2 mx-md-0 px-2 px-md-0 py-2" onClick={this.onTripClick}>
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
                            {date}
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
