import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(2, 0)
    }
})

const ShareTrip = ({ tripId, submit, classes, words }) => (
    <>
        <Typography
            variant="subtitle2"
        >
            Use this link to share the {words.what ? words.what.toLowerCase() : 'trip'}.
            Anyone with the link can view the {words.what ? words.what.toLowerCase() : 'trip'} information, itinerary, and
            register for the {words.what ? words.what.toLowerCase() : 'trip'}.
        </Typography>
        <div className={classes.button}>
            <CopyToClipboard
                text={`${process.env.REACT_APP_BASE_URL}/trips/${tripId}/share`}
                onCopy={submit}>
                <Fab
                    variant="extended"
                    color='primary'
                >
                    Copy link to clipboard
                </Fab>
            </CopyToClipboard>
        </div>
    </>
)

export default withStyles(styles)(ShareTrip)