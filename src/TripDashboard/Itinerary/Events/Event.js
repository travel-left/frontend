import React, { Component } from 'react'
import Map from './Map'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import moment from 'moment'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { Grid, withStyles } from '@material-ui/core'
import LeftModal from '../../../util/otherComponents/LeftModal'
import EventForm from '../../../Forms/EventForm'
import LeftFab from '../../../util/otherComponents/LeftFab'
import Document from '../../TripInformation/Documents/Document'
import StarIcon from '@material-ui/icons/Star'

const styles = theme => ({
    event: {
        padding: theme.spacing(2, 2, 2, 2),
        margin: theme.spacing(2, 0)
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
        backgroundColor: props => setIcon(props.event.type).color,
        borderRadius: '50%',
        height: theme.spacing(6),
        width: theme.spacing(6),
        marginRight: theme.spacing(2)
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
        color: props => setIcon(props.event.type).color,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    editButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
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

class Event extends Component {
    state = {
        showMap: false,
        showUpdateForm: false,
        isOpen: false
    }

    remove = () => {
        this.props.removeEvent(this.props.event._id)
        this.toggleModal()
    }

    update = updateObject => {
        console.log(updateObject)
        this.props.updateEvent(this.props.event._id, updateObject)
    }

    showMap = () => {
        this.setState({ showMap: true })
    }

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        const { event, classes, share, savedEvents } = this.props
        const icon = setIcon(event.type)
        const time = `${moment(event.start).format('h:mm a')} - ${moment(event.end).format('h:mm a')}`
        const address = <Typography variant="subtitle2" className={classes.address}>{event.address}</Typography>
        const map = event.coordinates && <>
            <Map coordinates={event.coordinates} />
            <Typography variant="subtitle1">
                <a href={`https://maps.google.com/?q=${event.coordinates.lat},${event.coordinates.long}`} target="_blank">                        {address} </a>
            </Typography>
        </>
        const name = event.name

        const documents = event.documents.map(doc =>
            <Document
                _id={doc._id}
                name={doc.name}
                description={doc.description}
                link={doc.link}
                type={doc.type}
                update={this.updateDocument}
                remove={this.deleteDocument}
                tinyDoc
            />
        )

        let links = event.links.map(link => <a href={link} target="_blank" className={classes.link}>{link}</a>)

        let flight

        if (event.departureAirportCode) {
            flight = `Flight: ${event.airline}${event.flightNumber} from ${event.departureAirportCode} to ${event.arrivalAirportCode}`
        } else {
            flight = `Flight:  from to `
        }


        return (
            <>
                <Card className={classes.event}>
                    <div className={classes.editButtonContainer}>
                        <div className={classes.titleContainer}>
                            <span className={classes.iconContainer}>
                                <i className={`fa ${icon.string} ${classes.icon}`} />
                            </span>
                            <Typography variant="h2" id="activity-name">
                                {event.type === 'FLIGHT' && event.airline ?
                                    flight :
                                    name
                                }
                            </Typography>
                        </div>
                        {!share &&
                            <LeftFab
                                id="edit-event-button"
                                onClick={this.toggleModal}
                            >
                                Edit
                            </LeftFab>
                        }
                    </div>
                    <Typography
                        variant="subtitle2"
                        className={classes.time}
                    >
                        {time}
                    </Typography>
                    <div className={classes.contentContainer}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle1" >
                                {event.description}
                            </Typography>
                            <div className={classes.linksContainer}>
                                {links}
                            </div>
                            {documents}
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} >
                            {map}
                        </Grid>
                    </div>
                    <div className={classes.bottomRight}>
                        {event.isSaved && savedEvents.includes(event._id) ? <span id="star"> <StarIcon fontSize='large' className={classes.starIcon} onClick={() => this.props.toggleSaveEvent(event._id, false)}></StarIcon></span> :
                            <StarBorderIcon fontSize='large' className={classes.starIcon} onClick={() => this.props.toggleSaveEvent(event._id, true)}>
                            </StarBorderIcon>
                        }
                    </div>
                </Card >

                {/* MODALS */}
                <>
                    {
                        this.state.isOpen && <LeftModal
                            closeModal={this.toggleModal}
                            title='Edit activity'
                            {...event}
                            submit={this.update}
                            remove={this.remove}
                            form={EventForm}
                            selectedDocuments={event.documents.map(doc => doc._id)}
                            documents={this.props.documents}
                        />
                    }
                </>
            </>
        )
    }
}

export default withStyles(styles)(Event)

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