import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    chip: {
        fontWeight: '500',
        fontFamily: 'roboto',
        fontSize: '12px',
        padding: theme.spacing(.5),
        color: '#FFFFFF',
        width: 112,
        backgroundColor: props => getStatusColor(props.status),
        textTransform: 'uppercase'
    }
})

const TravelerStatus = ({ status, className, classes }) => (
    <Chip
        className={`${className} ${classes.chip}`}
        label={status} />
)

export default withStyles(styles)(TravelerStatus)

function getStatusColor(status) {
    let statusColor = 'primary'
    switch (status) {
        case 'INVITED':
            statusColor = '#96DC4F'
            break
        case 'CONFIRMED':
            statusColor = '#83C9F4'
            break
        case 'LEFT':
            statusColor = '#0A58CE'
            break
        case 'RETURNED':
            statusColor = '#475561'
            break
        case 'NOT GOING':
            statusColor = '#FF5555'
            break
        case 'DOCS DUE':
            statusColor = '#FFAA31'
            break
        case 'MONEY DUE':
            statusColor = '#FFAA31'
            break
        default:
            statusColor = '#AAB5C0'
            break
    }

    return statusColor
}