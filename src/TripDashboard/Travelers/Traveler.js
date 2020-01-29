import React, { Component } from 'react'
import Image from '../../util/otherComponents/Image'
import Checkbox from '@material-ui/core/Checkbox'
import TravelerStatus from '../../util/otherComponents/TravelerStatus'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import sizes from '../../styles/sizes'

const styles = theme => ({
    traveler: {
        height: theme.spacing(12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: props => props.index % 2 !== 0 ? '#F6FAFF' : '#FFFFFF',
    },
    travelerName: {
        display: 'flex',
        justifyContent: 'start',
        width: theme.spacing(16),
        color: '#333333'
    },
    travelerEmail: {
        width: theme.spacing(16),
        textAlign: 'left'
    },
    travelerStatus: {
        width: theme.spacing(13),
        textAlign: 'center',
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    travelerTrip: {
        width: theme.spacing(16),
        fontFamily: 'Roboto',
        fontSize: '14px',
        color: '#333333',
        fontWeight: '600',
        textAlign: 'center',
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    travelerImage: {
        [sizes.down("md")]: {
            display: 'none'
        },
    },
    icon: {
        color: theme.palette.grey["A700"],
        fontSize: '24px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    checkbox: {
        padding: 0
    }
})

class Traveler extends Component {
    handleToggle = () => {
        this.props.toggle(this.props._id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props._id)
    }

    render() {
        let { name, email, status, image, selected, trip, showTrip, classes } = this.props

        return (
            <div
                className={classes.traveler}
                onDoubleClick={this.handleDoubleClick}
            >
                <Checkbox
                    onChange={this.handleToggle}
                    checked={selected}
                    color='primary'
                    className={classes.checkbox}
                />
                <div className={classes.travelerImage}>
                    <Image
                        diameter="64px"
                        src={image}
                        name={name}
                    />
                </div>
                <Typography
                    variant="h6"
                    className={classes.travelerName}
                >
                    {name}
                </Typography>
                <Typography
                    variant="caption"
                    className={classes.travelerEmail}
                >
                    {email}
                </Typography>
                <TravelerStatus
                    status={status}
                    className={classes.travelerStatus}
                />
                {showTrip &&
                    <span className={classes.travelerTrip}>
                        {trip}
                    </span>
                }
                <i
                    className={`material-icons ${classes.icon}`}
                    onClick={this.handleDoubleClick}
                >
                    more_vert
                </i>
            </div>
        )
    }
}

export default withStyles(styles)(Traveler)