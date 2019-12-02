import React, { Component } from 'react'
import Image from '../../../util/otherComponents/Image'
import Checkbox from '@material-ui/core/Checkbox'
import TravelerStatus from '../../../util/otherComponents/TravelerStatus'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default class Traveler extends Component {
    handleToggle = () => {
        this.props.toggle(this.props._id)
    }

    handleDoubleClick = () => {
        this.props.onDoubleClick(this.props._id)
    }

    render() {
        let { name, email, status, image, selected, index, trip, showTrip } = this.props
        let bgColor = index % 2 !== 0 ? '#F6FAFF' : '#FFFFFF'

        return (
            <Grid container
                className="d-flex animated fadeIn justify-content-around align-items-center hover flex-grow-1"
                style={{
                    backgroundColor: bgColor,
                    paddingTop: 8,
                    paddingBottom: 8
                }}
                onDoubleClick={this.handleDoubleClick}
            >
                <Grid item xs={1} >
                    <Checkbox
                        onChange={this.handleToggle}
                        checked={selected}
                        color='primary'
                    />
                </Grid>
                <Grid item xs={2} className="d-none d-xl-flex">
                    <Image diameter="64px" src={image} name={name} />
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" style={{ color: '#333333', }}>{name}</Typography>
                </Grid>
                <Grid item xs={3} className="d-none d-xl-flex">
                    <Typography variant="subtitle2">{email}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TravelerStatus status={status} />
                </Grid>
                {showTrip &&
                    <Grid item xs={3} style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        color: '#333333',
                        fontWeight: '600',
                        textAlign: 'left',
                    }}>
                        {trip}
                    </Grid>
                }
                <Grid item xs={1}>
                    <i class="material-icons hover" style={{ color: '#AAB5C0', fontSize: '24px' }}
                        onClick={this.handleDoubleClick}>more_vert</i>
                </Grid>
            </Grid>
        )
    }
}
