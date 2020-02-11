import React from 'react'
import Event from './Event'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'

const styles = theme => ({
    day: {
        margin: theme.spacing(3, 0, 0, 0)
    }
})

export default withStyles(styles)(({ events, removeEvent, updateEvent, toggleSaveEvent, documents, share, classes }) => {
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
                <Fade in={true} timeout={300}>
                    <div>
                        {dayHeader}
                    </div>
                </Fade>
                <Fade in={true} timeout={1200}>
                    <div>
                        <Event event={event} removeEvent={removeEvent} updateEvent={updateEvent} toggleSaveEvent={toggleSaveEvent} documents={documents} share={share} />
                    </div>
                </Fade>
            </div>
        )
    })
})
