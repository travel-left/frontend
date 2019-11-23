import React from 'react'
import List from '@material-ui/core/List'
import SideNavLink from './SideNavLink'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

export default withRouter(function SideNav({ ctId, location }) {
    const sideNavComponents = [
        {
            name: 'edit',
            text: 'Trip Information',
            active: location.pathname.includes('edit')
        },
        {
            name: 'itinerary',
            text: 'Manage Itinerary',
            divider: true,
            active: location.pathname.includes('itinerary')
        },
        {
            name: 'travelers',
            text: 'Manage Travelers',
            divider: true,
            active: location.pathname.includes('travelers')
        }
    ]
    const sideNavList = sideNavComponents.map(({ name, text, divider, active }) => (
        <SideNavLink key={name} text={text} name={name} tripId={ctId} divider={divider} active={active} />
    ))
    return (
        <List component="div" style={{ paddingTop: 0, paddingBottom: 0 }}>
            {sideNavList}
            <Card>
                <Divider />
                <ListItem onClick={() => window.open(`/trips/${ctId}/preview`)} button className='d-flex justify-content-between align-items-center' style={{ padding: '12px 16px' }}>
                    <Typography variant="h6" >Trip Preview</Typography>
                </ListItem>
            </Card>
        </List>
    )
})
