import React from 'react'
import Event from './Event'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    day: {
        margin: theme.spacing(3, 0, 0, 0)
    }
})

export default withStyles(styles)(({ events, removeEvent, updateEvent, documents, share, classes }) => {
    let daysList = []

    return events.map(event => {
        let dayHeader = daysList.includes(event.start.format('MMM DD YYYY')) ? null : (
            <Typography
                name={moment(event.start).format('MMM DD YYYY')}
                variant="h2"
                className={classes.day}
            >
                {moment(event.start).format('MMM DD')}
            </Typography>)

        daysList.push(event.start.format('MMM DD YYYY'))

        return (
            <div key={event._id}>
                {dayHeader}
                <Event event={event} removeEvent={removeEvent} updateEvent={updateEvent} documents={documents} share={share} />
            </div>
        )
    })
})
