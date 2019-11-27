import React from 'react'
import LeftCardNew from '../LeftCardNew'
import Grid from '@material-ui/core/Grid';

export default function Alert({ closeAlert, text }) {
    return (
        <LeftCardNew>
            <Grid item xs={1}>
                <i className="fas fa-thumbs-up fa-lg text-light" />
            </Grid>
            <Grid item xs={10}>
                <span>{text}</span>
            </Grid>
            <Grid item xs={1}>
                <i
                    className="fas fa-times fa-md text-dark hover"
                    onClick={closeAlert}
                />
            </Grid>
        </LeftCardNew>
    )
}
