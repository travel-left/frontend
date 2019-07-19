import React, { Component } from 'react'
import Moment from 'react-moment'

class TripInfo extends Component {
    handleEditClick = () => {
        this.props.edit(this.props.trip._id)
    }

    render() {
        let { name, dateStart, image, description, status } = this.props.trip
        let { statusCounts } = this.props

        return (
            <div className="pb-3 bg-light">
                <img src={image} className="card-img-top border-0 mb-4 px-2" alt="..." style={{ backgroundColor: '#FBFBFB' }} />
                <div className="container bg-light">
                    <span className="h4">Trip to {name}</span>
                    <button onClick={this.handleEditClick} className="btn btn-lg btn-primary float-right">
                        Edit
                    </button>
                    <p className="py-3 text-black-50">{description}</p>
                    <ul className="list-group list-group-flush px-0 mx-0 pb-4">
                        <li className="list-group-item bg-light">
                            Date{' '}
                            <span className="float-right text-primary">
                                <Moment date={dateStart} format="MMM DD" />
                            </span>
                        </li>
                        <li className="list-group-item bg-light">
                            Status <span className="float-right badge badge-primary badge-pill badge-secondary text-light">{status}</span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Invited <span className="float-right badge badge-primary badge-pill">{statusCounts ? statusCounts.INVITED : null}</span>
                        </li>
                        <li className="list-group-item bg-light">
                            Total Confirmed <span className="float-right badge badge-primary badge-pill">{statusCounts ? statusCounts.CONFIRMED : null}</span>
                        </li>
                    </ul>
                    {/* <button className="btn btn-lg btn-secondary text-light">DUPLICATE</button>
                    <button className="btn btn-lg btn-secondary text-light float-right">ARCHIVE</button> */}
                </div>
            </div>
        )
    }
}

export default TripInfo
