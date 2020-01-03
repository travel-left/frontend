import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

export default function SideNavLink({ text, tripId, name, active, divider, route }) {
    return (
        <Card>
            {divider && <Divider />}
            <NavLink
                to={route}
                name={route}
            >
                <ListItem button className='d-flex justify-content-between align-items-center' style={{ background: active && '#0A58CE', padding: '13px 16px' }}>

                    <Typography variant="h6" style={{ color: active ? 'white' : '#666666' }}>{text}</Typography>

                </ListItem>
            </NavLink>
        </Card>
    )
}

