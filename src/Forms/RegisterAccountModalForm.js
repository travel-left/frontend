import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import LeftButton from '../util/otherComponents/LeftButton'

export default () => (
    <div>
        <Typography variant="subtitle2">
            Your account is not yet verified, please head over to your account page to verify.
                </Typography>
        <Divider style={{ marginTop: 40, marginBottom: 25 }} />
        <LeftButton type="submit" color="secondary" id="signup" onClick={() => window.location.href = `https://app.travel-left.com/account/travelerPayments`}>
            Go to account
                </LeftButton>
    </div>
)
