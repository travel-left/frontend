import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 2),
        backgroundColor: props => props.active && theme.palette.primary.main,
        "&:hover": {
            backgroundColor: props => props.active && theme.palette.primary.main
        }
    },
    listItemText: {
        color: props => props.active ? 'white' : '#666666'
    }
})

export default withStyles(styles)(({ text, divider, route, classes }) => {
    return (
        <Card>
            {divider && <Divider />}
            <NavLink
                to={route}
                name={route}
            >
                <ListItem
                    button
                    className={classes.listItem}
                >
                    <Typography
                        variant="h6"
                        className={classes.listItemText}
                    >
                        {text}
                    </Typography>
                </ListItem>
            </NavLink>
        </Card>
    )
})

