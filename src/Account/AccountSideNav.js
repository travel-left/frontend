import React from 'react'
import List from '@material-ui/core/List'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import SideNavLink from '../TripDashboard/SideNav/SideNavLink'

export default withRouter(function AccountSideNav({ ctId, location }) {
    const sideNavComponents = [
        {
            name: 'personal',
            text: 'Personal Info',
            active: location.pathname.includes('personal')
        },
        {
            name: 'billing',
            text: 'Billing',
            divider: true,
            active: location.pathname.includes('billing')
        },
        {
            name: 'organization',
            text: 'Organization',
            divider: true,
            active: location.pathname.includes('organization')
        },
        {
            name: 'travelerPayments',
            text: 'Traveler Payments',
            divider: true,
            active: location.pathname.includes('travelerPayments')
        }
    ]
    const sideNavList = sideNavComponents.map(({ name, text, divider, active }) => (
        <SideNavLink key={name} text={text} name={name} divider={divider} active={active} route={`/account/${name}`} />
    ))
    return (
        <List component="div" style={{ paddingTop: 0, paddingBottom: 0 }}>
            {sideNavList}
        </List>
    )
})
