import React from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCover from './AccountCover'
import AccountSideNav from './AccountSideNav'
import AccountRouter from './AccountRouter'


const Account = props => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingTop: 16 }}>
                <AccountCover user={props.currentUser}></AccountCover>
            </Grid>
            <Grid item xs={12} md={2}>
                <AccountSideNav />
            </Grid>
            <Grid item xs={12} md={8} lg={8} justify='center' className='d-flex'>
                <Grid item xs={12} md={8} lg={6} >
                    <AccountRouter
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Account

