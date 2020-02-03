import React from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter, NavLink } from 'react-router-dom';
import LeftFab from '../util/otherComponents/LeftFab';
import { withStyles } from '@material-ui/core'
import LeftButton from '../util/otherComponents/LeftButton'

const styles = theme => ({
    coverPhoto: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: "0px 2px 1px - 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        backgroundImage: props => `url(${props.trip.image})`,
        height: theme.spacing(24),
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '0px 0px 4px 4px',
        padding: 16
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(4)
    },
    bottomRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    travelerCount: {
        fontWeight: '500',
        fontFamily: 'roboto',
        fontSize: 12,
        color: '#FFFFFF',
        minWidth: 48,
        backgroundColor: '#475561',
        height: 28,
        textTransform: 'uppercase'
    }
})


const ShareCover = withRouter(({ trip, classes, token }) => {
    let registrationButton = null

    if (trip.travelerRegistrationFormSettings && trip.travelerRegistrationFormSettings.hasPublish && !token) {
        registrationButton = (
            <NavLink
                to={`/trips/${trip._id}/register`}
                name={`/trips/${trip._id}/register`}
            >
                <LeftButton type="submit" id="traveler-register-button">
                    {trip.travelerRegistrationFormSettings.hasDueDate ?
                        (<>
                            {'Register By\xa0'}
                            <Moment
                                date={trip.travelerRegistrationFormSettings &&
                                    trip.travelerRegistrationFormSettings.dueDate.split('T')[0]}
                                format="MMM DD"
                            />
                        </>)
                        : 'REGISTER'}
                </LeftButton>
            </NavLink>
        )
    }
    else if (trip.travelerRegistrationFormSettings && trip.travelerRegistrationFormSettings.hasPublish && token === 'needPayment') {
        registrationButton = (
            <NavLink
                to={`/trips/${trip._id}/register`}
                name={`/trips/${trip._id}/register`}
            >
                <LeftButton size="large" type="submit">
                    PAY BY{'\xa0'}
                    <Moment
                        date={trip.travelerRegistrationFormSettings &&
                            trip.travelerRegistrationFormSettings.dueDate.split('T')[0]}
                        format="MMM DD"
                    />
                </LeftButton >
            </NavLink>
        )
    }
    else if (token) {
        registrationButton = <Typography variant="h1" color="primary" style={{ display: 'inline', textAlign: 'end' }}>Thanks for registering</Typography>
    }
    if (trip.travelerRegistrationFormSettings && trip.travelerRegistrationFormSettings.hasDueDate && (Date.parse(trip.travelerRegistrationFormSettings.dueDate) < Date.now())) {
        registrationButton = <Typography variant="h1" color="primary" style={{ display: 'inline', textAlign: 'end' }}>Registration is over</Typography>
    }



    return (
        <div className={classes.coverPhoto}>
            <div className={classes.topRow}>
                <LeftFab>{trip.name}</LeftFab>
                {registrationButton}
            </div>
            <div className={classes.bottomRow} >
                <LeftFab>{trip.orgName}</LeftFab>
                <LeftFab>
                    {trip.dateStart && moment(trip.dateStart.split('T')[0]).format('MMM DD') + ' - ' + moment(trip.dateEnd.split('T')[0]).format('MMM DD')}
                </LeftFab>
            </div>
        </div>
    )
})

export default withStyles(styles)(ShareCover)