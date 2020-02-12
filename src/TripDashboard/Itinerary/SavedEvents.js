import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    event: {
        padding: theme.spacing(2, 2, 2, 2),
        margin: theme.spacing(2, 0),

    },
    eventContainer: {
        "&:hover button": {
            height: theme.spacing(4),
            width: theme.spacing(4),
            minHeight: theme.spacing(4),
            minWidth: theme.spacing(4),
        },
    },
    fab: {
        transition: "all 0.2s ease-in-out",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 0,
        width: 0,
        minHeight: 0,
        minWidth: 0,
        padding: 0,
        margin: 0,
    },
    bottomRight: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.spacing(4),
        width: theme.spacing(4),
        paddingRight: theme.spacing(1)
    },
    icon: {
        color: '#FFFFFF',
        fontSize: '18px'
    },
    starIcon: {
        color: '#FEC400',
        "&:hover": {
            transform: "scale(1.5)",
            cursor: "pointer"
        },
        transition: "all 0.3s ease-in-out",
    },
    time: {
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        width: "100%",
    },
    name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-between",
        width: "100%",
        height: theme.spacing(4)
    },
    leftSideTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    rightSideTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    editButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    contentContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    link: {
        margin: theme.spacing(1, 0),
        display: 'block'
    },
    address: {
        textAlign: 'center',
        margin: theme.spacing(2, 0)
    }
})

class SavedEvents extends Component {
    addToItinerary = async event => {
        this.props.addToItinerary(event._id)
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <Typography variant="h2">Saved Events</Typography>
                {this.props.savedEvents.map(event => {
                    const icon = setIcon(event.type)
                    const time = `${moment(event.start).format('h:mm a')} - ${moment(event.end).format('h:mm a')}`
                    let flight

                    if (event.departureAirportCode) {
                        flight = `Flight: ${event.airline}${event.flightNumber} from ${event.departureAirportCode} to ${event.arrivalAirportCode}`
                    } else {
                        flight = `Flight:  from to `
                    }
                    const name = event.name
                    return (
                        <div className={classes.eventContainer}>

                            <Card className={classes.event} >
                                <div className={classes.editButtonContainer}>
                                    <div className={classes.titleContainer}>
                                        <div className={classes.leftSideTitle}>
                                            <span className={classes.iconContainer}>
                                                <i className={`fa ${icon.string} ${classes.icon}`} style={{ color: setIcon(event.type).color }} />
                                            </span>
                                            <Typography variant="h6" className={classes.name}>
                                                {moment(event.start).format('MMM DD')}
                                            </Typography>
                                        </div>
                                        <div className={classes.rightSideTitle}>
                                            <Typography
                                                variant="subtitle2"
                                                className={classes.time}
                                                style={{ color: setIcon(event.type).color }}
                                            >
                                                {time}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div className={classes.name}>
                                        <Typography variant="subtitle2" id="activity-name">
                                            {event.type === 'FLIGHT' && event.airline ?
                                                flight :
                                                name
                                            }
                                        </Typography>
                                        <Fab color="primary" variant="extended" className={classes.fab} onClick={() => this.addToItinerary(event)}>
                                            <AddIcon />
                                        </Fab>
                                    </div>
                                </div>

                            </Card >
                        </div>

                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(SavedEvents)

function setIcon(eventType) {
    let icon = {
        string: '',
        color: ''
    }
    switch (eventType) {
        case 'LODGING':
            icon.string = 'fa-bed'
            icon.color = '#475561'
            break
        case 'TRANSPORTATION':
            icon.string = 'fa-car'
            icon.color = '#83C9F4'
            break
        case 'EVENT':
            icon.string = 'fa-calendar-check'
            icon.color = '#0A58CE'
            break
        case 'FLIGHT':
            icon.string = 'fa-plane'
            icon.color = '#FFAA31'
            break
        default:
            break
    }

    return icon
}