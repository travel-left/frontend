import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    card: {
        height: 345,
        width: 358,
        padding: '35px 23px'
    },
    leftSubHeader: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: '14px',
        color: '#A1A1A1',
        letterSpacing: '0.3px'
    }
})

export default ({ submit }) => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Card className={classes.card} >
            <Typography variant="h5" >
                Welcome back!
            </Typography>
            <span className={classes.leftSubHeader}>Please sign into your account.</span>
            <TextField
                required
                id="standard-required"
                label="Email"
                value={email}
                placeholder="Your email address"
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                fullWidth
            />
            <TextField
                required
                id="standard-required"
                label="Password"
                value={password}
                placeholder="Create a password"
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                fullWidth
            />
            <Button size="large" variant="contained" color="primary" style={{ width: '180px', height: '50px', float: 'right', marginTop: '25px' }} onClick={() => submit({ email, password })}>
                Sign in
            </Button>
        </Card>
    )
}
