import React from 'react'
import SideNavLink from './SideNavLink'

export default function SideNav({ ctId }) {
    const sideNavComponents = [
        {
            name: 'edit',
            text: 'Trip Information'
        },
        {
            name: 'itinerary',
            text: 'Manage Itinerary'
        },
        {
            name: 'travelers',
            text: 'Manage Travelers'
        },
        {
            name: 'preview',
            text: 'Trip Preview'
        }
    ]
    const sideNavList = sideNavComponents.map(({ name, text }) => (
        <SideNavLink key={name} text={text} name={name} tripId={ctId} />
    ))
    return (
        <div className="bg-light px-0" style={{
            background: '#FFFFFF',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
            borderRadius: '3px'
        }}>
            <ul className="list-group list-group-flush bg-light shadow">
                {sideNavList}
            </ul>
        </div>
    )
}
