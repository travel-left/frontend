import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideNav.css'

export default function SideNavLink({ text, tripId, name, icon }) {
    return (
        <NavLink
            className="d-flex justify-content-start align-items-center border-0 py-3 side-nav-link hover"
            activeClassName="side-nav-link-active"
            to={`/trips/${tripId}/${name}`}
            name={`/trips/${tripId}/${name}`}
            style={{
                fontFamily: 'Roboto',
                fontSize: '20px',
                fontWeight: '700',
                color: '#666666',
                borderRadius: '3px'
            }}
        >
            <i class="material-icons-outlined mr-4" style={{ fontWeight: 'bold' }}>
                {icon}
            </i>
            {text}
        </NavLink>
    )
}
