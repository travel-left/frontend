import React from 'react'
import SideNavLink from './SideNavLink'

export default function SideNav({ ctId }) {
    const sideNavComponents = [
        {
            name: 'edit',
            text: 'Trip Information',
            icon: 'info'
        },
        {
            name: 'itinerary',
            text: 'Manage Itinerary',
            icon: 'event'
        },
        {
            name: 'travelers',
            text: 'Manage Travelers',
            icon: 'people_alt'
        },
        {
            name: 'preview',
            text: 'Trip Preview',
            icon: 'mobile_screen_share'
        }
    ]
    const sideNavList = sideNavComponents.map(({ name, text, icon }) => (
        <SideNavLink key={name} text={text} name={name} tripId={ctId} icon={icon} />
    ))
    return (
        <div className="px-0 mt-4">
            <ul className="pl-1" >
                {sideNavList}
            </ul>
        </div>
    )
}
