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
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="text-black ">
                            Here's a preview of your{' '}
                            {this.props.currentTrip.name} trip for your
                            travelers.
                        </h2>
                        <p>
                            You can send the trip preview to your travelers at
                            any time using the airplane button in the top right
                            of the page.
                        </p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 shadow">
                        <Share />
                    </div>
                </div>
            </div>
        )
    }
}
