import React from 'react'
import './TripsListHeader.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default () => (
    <Paper>
        <div className="d-none d-md-flex flex-row justify-content-around mb-3 align-items-center TripsListHeader">
            <Grid item xs={3}></Grid>
            <Grid item xs={3} className=''>
                <Typography variant="h6">TRIP NAME</Typography>
            </Grid>
            <Grid item xs={1} className='text-center'>
                <Typography variant="h6">DATE</Typography>
            </Grid>
            <Grid item xs={3} className='text-center'>
                <Typography variant="h6">STATUS</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
        </div>
    </Paper>

)