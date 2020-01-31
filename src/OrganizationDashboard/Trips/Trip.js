import React, { Component } from 'react'
import Moment from 'react-moment'
import TripStatus from '../../util/otherComponents/TripStatus'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import styles from '../../styles/trip'

class Trip extends Component {
    handleClick = () => {
        this.props.click(this.props.id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props.id)
    }

    render() {
        const { name, image, dateStart, status, classes } = this.props

        return (
            <Paper className={classes.tripCard}
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
            >
                <img
                    src={image}
                    className={classes.tripImage}
                    alt="..."
                />
                <div className={classes.tripName}>
                    <Typography variant="h2">{name}</Typography>
                </div>
                <div className={classes.tripDate}>
                    <Typography variant="subtitle1">
                        <Moment date={dateStart} format="MMM DD" />
                    </Typography>
                </div>
                <div className={classes.tripStatus}>
                    <TripStatus status={status} />
                </div>
                <Button size="large" variant="contained" color="primary" onClick={this.handleDoubleClick} className="float-right" style={{
                    width: 128,
                    height: 56,
                }}>open trip</Button>
            </Paper>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Trip)
