import React, { Component } from 'react'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    listItem: {
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        backgroundColor: props => props.active && theme.palette.primary.main,
        padding: theme.spacing(2),
        "&:hover": {
            backgroundColor: props => props.active && theme.palette.primary.main,
        }
    },
    name: {
        color: props => props.active ? 'white' : '#666666'
    }
})

class Day extends Component {

    handleClick = e => {
        this.props.handleClick(this.props.day.day)
    }

    render() {
        const { divider, classes, day } = this.props
        return (
            <Card>
                {divider && <Divider />}
                <ListItem
                    onClick={this.handleClick}
                    button
                    className={classes.listItem}
                >
                    <Typography variant="h6" className={classes.name}>
                        {moment(day.day).format('MMM DD')}{' - '}{day.name}
                    </Typography>
                </ListItem>
            </Card>
        )
    }
}

export default withStyles(styles)(Day)
