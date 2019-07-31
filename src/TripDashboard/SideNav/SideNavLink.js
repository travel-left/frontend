import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNavLink({ text, tripId, name }) {
    return (
        <NavLink
            className="list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 h6 py-3 text-dark"
            activeClassName="active"
            to={`/trips/${tripId}/${name}`}
            name={`/trips/${tripId}/${name}`}
        >
            {text}{' '}
        </NavLink>
    )
}
