import React, { Component } from 'react'

export default class TripDates extends Component {
    render() {
        return (
            <div class="card shadow border-0 mb-3 col-md-5 mx-4">
                <TripDate></TripDate>
                <TripDate></TripDate>
                <TripDate></TripDate>
                <button className="btn btn btn-secondary text-light mx-5 my-2">add new</button>
            </div>
        )
    }
}

const TripDate = () => {
    return (
        <div class="card-body">
            <div className="row no-gutters d-flex justify-content-between">
                <div className="col-md-3 d-flex flex-row align-items-center">
                    <i class="fas fa-shuttle-van fa-2x" ></i>
                </div>
                <div className="col-md-7">
                    <p className="text-bold my-1">Last day to register</p>
                    <p className="my-1"><small class="text-muted">September 02</small></p>
                </div>
                <div className="col-md-2 d-flex d-row align-items-center justify-content-end hover">
                    <i class="fas fa-ellipsis-h h5"></i>
                </div>
            </div>
        </div>
    )
}