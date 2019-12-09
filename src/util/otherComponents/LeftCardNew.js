import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

export default class LeftCardNew extends Component {
    render() {
        return (
            <Grid item xs={12} sm={8} md={6} >
                <Card className='d-flex justify-content-around align-items-center animated fadeIn' style={{ height: this.props.height, margin: 16 }}>
                    {this.props.children}
                </Card>
            </Grid>
        )
    }
}
