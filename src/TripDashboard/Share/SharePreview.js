import React, { Component } from 'react'
import Share from './index'
import { apiCall } from '../../util/api'

export default class SharePreview extends Component {
    tripId = this.props.match.params.tripId
    state = {
        travelers: []
    }

    constructor(props) {
        super(props)

        this.getAndSetTravelers()
    }
    sendTripToTravelers = () => {
        let travelersPhones = []
        for (const traveler of this.state.travelers) {
            if (traveler.phone) {
                travelersPhones.push(traveler.phone)
            }
        }

        apiCall('post', '/api/communicate/text', {
            body: `Here's a link to your trip! https://app.travel-left.com/trips/${
                this.tripId
                }/share`,
            phones: travelersPhones
        })
    }

    getAndSetTravelers = async () => {
        const travelers = await apiCall(
            'get',
            `/api/trips/${this.tripId}/travelers`
        )
        this.setState({
            travelers
        })
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <Share />
                    </div>
                </div>
            </div>
        )
    }
}
