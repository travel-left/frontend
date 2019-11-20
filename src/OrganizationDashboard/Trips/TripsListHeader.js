import React from 'react'
import './TripsListHeader.css'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default () => (
    <Paper>
        <div className="d-none d-md-flex flex-row justify-content-around mb-3 align-items-center TripsListHeader">
            <div className="col-md-2  TripsListHeader-filter">
                <Typography variant="h6">TRIP NAME</Typography>
            </div>
            <div className="col-md-4" />
            <div className="col-md-2 offset-md-1 TripsListHeader-filter">
                <Typography variant="h6">DATE</Typography>

            </div>
            <div className="col-md-3 TripsListHeader-filter">
                <Typography variant="h6">STATUS</Typography>
            </div>
        </div>
    </Paper>

)