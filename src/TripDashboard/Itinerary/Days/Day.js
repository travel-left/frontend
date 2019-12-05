import React, { Component } from 'react'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

export default class Day extends Component {
    handleClick = e => {
        this.props.handleClick(this.props.day.day)
    }

    render() {
        return (
            <Card>
                {this.props.divider && <Divider />}
                <ListItem onClick={this.handleClick} button className='d-flex justify-content-between align-items-center' style={{ background: this.props.active && '#0A58CE', padding: '13px 16px' }}>
                    <Typography variant="h6" style={{ color: this.props.active ? 'white' : '#666666' }}>
                        {moment(this.props.day.day).format('MMM DD')}{' - '}{this.props.day.name}
                    </Typography>
                </ListItem>
            </Card>
        )
    }
}
