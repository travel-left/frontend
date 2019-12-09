import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab'
import { CopyToClipboard } from 'react-copy-to-clipboard'


export default class ShareTrip extends Component {
    render() {
        return (
            <>
                <p className='TripInfo-description'>Use this link to share the trip. Anyone with the link can view only trip itinerary, info and coordinator details.</p>
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <CopyToClipboard text={`https://app.travel-left.com/trips/${this.props.tripId}/share`} onCopy={this.props.submit}>
                        <Fab variant="extended" color='primary' aria-label="delete" className="linky-boi-button">Copy link to clipboard</Fab>
                    </CopyToClipboard>
                </div>
            </>
        )
    }
}