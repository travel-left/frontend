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
            <div className="container">
                <div className="row mb-4 ml-2 mt-4 pr-5">
                    <div className="col-6">
                        <h2 className="text-black d-inline ">
                            Here's a preview of your trip for your travelers
                        </h2>
                        <br />
                        <button
                            className="btn btn-lg btn-primary"
                            onClick={this.sendTripToTravelers}
                        >
                            Send to travelers
                        </button>
                    </div>
                    <div className="col-4">
                        <div style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                            <div
                                className="iphone6"
                                style={{ height: '70vh', zIndex: '-1' }}
                            >
                                <div className="screen">
                                    <Share />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
