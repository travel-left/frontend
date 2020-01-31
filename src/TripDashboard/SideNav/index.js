import React from 'react'
import List from '@material-ui/core/List'
import SideNavLink from './SideNavLink'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 2)
    },
    list: {
        padding: 0
    }
})

export default withRouter(withStyles(styles)(function SideNav({ ctId, location, classes, words }) {
    const sideNavComponents = [
        {
            name: 'edit',
            text: `${words.what} Information`,
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
            text: `Manage ${words.whoPlural}`,
            divider: true,
            active: location.pathname.includes('travelers')
        }
    ]

    const sideNavList = sideNavComponents.map(({ name, text, divider, active }) => (
        <SideNavLink
            key={name}
            text={text}
            name={name}
            divider={divider}
            active={active}
            route={`/trips/${ctId}/${name}`}
        />
    ))

    return (
        <List component="div" className={classes.list}>
            {sideNavList}
            <Card>
                <Divider />
                <ListItem
                    onClick={() => window.open(`/trips/${ctId}/preview`)}
                    button
                    className={classes.listItem}
                >
                    <Typography variant="h6" >{words.what} Preview</Typography>
                </ListItem>
            </Card>
        </List>
    )
}))
