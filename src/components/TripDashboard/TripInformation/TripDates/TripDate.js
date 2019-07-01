import React, { Component } from 'react'
import UpdateTripDateForm from './UpdateTripDateForm'

class TripDate extends Component {

    handleEditTripDate = putObject => {
        this.props.updateTripDate(this.props._id, putObject)
    }

    render() {
        let { name, date, type, _id } = this.props
        return (
            <div class="card-body">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <i class="fas fa-shuttle-van fa-2x" ></i>
                        {type}
                    </div>
                    <div className="col-md-7">
                        <p className="text-bold my-1">{name}</p>
                        <p className="my-1"><small class="text-muted">{date}</small></p>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center justify-content-end hover">
                        <UpdateTripDateForm id={_id} name={name} date={date} type={type} submit={this.handleEditTripDate} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TripDate