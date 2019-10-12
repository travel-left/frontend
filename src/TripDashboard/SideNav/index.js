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
        }
    ]
    const sideNavList = sideNavComponents.map(({ name, text }) => (
        <SideNavLink key={name} text={text} name={name} tripId={ctId} />
    ))
    return (
        <div className="px-0" style={{
            background: '#FFFFFF',
            boxShadow: '-2px 2px 4px 0 rgba(0, 0, 0, 0.3)',
            borderRadius: '8px'
        }}>
            <ul className="list-group list-group-flush">
                {sideNavList}
                <a href={`/trips/${ctId}/preview`} target="_blank" className="list-group-item d-flex justify-content-between align-items-center border-right-0 border-left-0 py-3"
                    activeClassName="active"
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#666666',
                        borderRadius: '3px'
                    }}
                >
                    Trip Preview</a>
            </ul>
        </div>
    )
}