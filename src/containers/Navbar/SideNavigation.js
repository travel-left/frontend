import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

class SideNavigation extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { currentTrip } = this.props
        return (
            <div className="pl-4 pt-4">
                <ul className="list-group list-group-flush bg-light">
                    <SideNavLink text='Trip Information' name='edit' tripId={currentTrip._id}></SideNavLink>
                    <SideNavLink text='Itinerary' name='itinerary' tripId={currentTrip._id}></SideNavLink>
                    <SideNavLink text='Documents' name='documents' tripId={currentTrip._id}></SideNavLink>
                    <SideNavLink text='Travelers' name='travelers' tripId={currentTrip._id}></SideNavLink>
                    <SideNavLink text='Mobile App' name='mobile' tripId={currentTrip._id}></SideNavLink>
                    <SideNavLink text='Communicate' name='communicate' tripId={currentTrip._id}></SideNavLink>
                </ul>
            </div>
        )
    }
}

export default withRouter(SideNavigation)

const SideNavLink = ({ text, tripId, name }) => {
    return (<NavLink className='text-primary font-weight-bold py-4' activeClassName="text-secondary" to={`/trips/${tripId}/${name}`} name={`/trips/${tripId}/${name}`}>{text} </NavLink>)
}