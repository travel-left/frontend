import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNavLink({ text, tripId, name }) {
    return (
        <NavLink
            className="list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 py-3"
            activeClassName="active"
            to={`/trips/${tripId}/${name}`}
            name={`/trips/${tripId}/${name}`}
            style={{
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '500',
                color: '#666666'
            }}
        >
            {text}{' '}
        </NavLink>
    )
}
