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
        <div className="shadow bg-light px-0">
            <ul className="list-group list-group-flush bg-light shadow">
                {sideNavList}
            </ul>
        </div>
    )
}
