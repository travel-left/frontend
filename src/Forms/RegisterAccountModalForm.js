import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default () => (
    <div>
        <Typography variant="subtitle2">
            Your account is not yet verified, please head over to your account page to verify.
                </Typography>
        <Button size="large" type="submit" variant="contained" color="secondary" id="signup" style={{ width: '180px', height: '50px', color: 'white', marginTop: '25px' }} onClick={() => window.location.href = `https://app.travel-left.com/account/travelerPayments`}>
            Go to account
                </Button>
    </div>
)
