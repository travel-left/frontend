import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'

const SideNavigation = ({ currentTrip }) => {
    return (
        <div className="pl-4 pt-4">
            <ul className="list-group list-group-flush bg-light">
                <SideNavLink text="Trip Information" name="edit" tripId={currentTrip._id} />
                <SideNavLink text="Itinerary" name="itinerary" tripId={currentTrip._id} />
                <SideNavLink text="Travelers" name="travelers" tripId={currentTrip._id} />
                <SideNavLink text="Mobile App" name="mobile" tripId={currentTrip._id} />
                <SideNavLink text="Communicate" name="communicate" tripId={currentTrip._id} />
            </ul>
        </div>
    )
}

export default withRouter(SideNavigation)

const SideNavLink = ({ text, tripId, name }) => {
    return (
        <NavLink className="text-primary font-weight-bold py-4" activeClassName="text-secondary" to={`/trips/${tripId}/${name}`} name={`/trips/${tripId}/${name}`}>
            {text}{' '}
        </NavLink>
    )
}
