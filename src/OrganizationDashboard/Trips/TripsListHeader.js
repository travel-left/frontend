import React from 'react'
import './TripsListHeader.css'

export default () => (
    <div className="d-none d-md-flex flex-row justify-content-around mb-3 align-items-center TripsListHeader">
        <div className="col-md-2 text-uppercase TripsListHeader-filter">
            TRIP NAME
        </div>
        <div className="col-md-4" />
        <div className="col-md-2 offset-md-1 text-uppercase TripsListHeader-filter">
            Date
        </div>
        <div className="col-md-3 text-uppercase TripsListHeader-filter">
            Status
        </div>
    </div>
)