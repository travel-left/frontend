import React, { Component } from 'react'

class TripCoordinator extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mb-3 col-md-5 border-0 shadow mx-4">
                <div className="row no-gutters d-flex justify-content-between">
                    <div className="col-md-3 d-flex flex-row align-items-center">
                        <img src="https://pbs.twimg.com/profile_images/1141923987422793728/A7AdWyno_400x400.jpg" class="card-img rounded-circle px-2 py-2" alt="..."></img>
                    </div>
                    <div className="col-md-6">
                        <div className="ml-3">
                            <p className="text-bold my-1">Jordan Boudreau</p>
                            <p className="my-1">Super Admin</p>
                            <p className="my-1"><small class="text-muted">559-393-5872</small></p>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex d-row align-items-center">
                        <button className="btn btn btn-secondary text-light">edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TripCoordinator