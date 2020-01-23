import React from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCover from './AccountCover'
import AccountSideNav from './AccountSideNav'
import AccountRouter from './AccountRouter'
import ReactGA from 'react-ga'

function initializeReactGA() {
    ReactGA.initialize('UA-145382520-1')
    ReactGA.pageview('/account')
}

const Account = props => {
    if (process.env.NODE_ENV === 'production') {
        initializeReactGA()
    }
    return (
        <Grid container>
            <Grid item xs={12} style={{ paddingTop: 16 }}>
                <AccountCover user={props.currentUser} setCurrentUser={props.setCurrentUser}></AccountCover>
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

