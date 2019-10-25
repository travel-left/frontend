import React, { Component } from 'react'
import { apiCall } from '../util/api'
import CheckoutForm from '../util/forms/CheckoutForm'
import CreateChargeForm from '../util/forms/CreateChargeForm'

export default class CollectPayment extends Component {
    tripId = this.props.match.params.tripId
    coordinatorId = this.props.match.params.coordinatorId
    formId = this.props.match.params.formId

    state = {
        trip: {},
        orgName: '',
        formInfo: {}
    }

    constructor(props) {
        super(props)

        this.getTripInfo()
        this.getFormInfo()
    }

    getTripInfo = async () => {
        let trip = await apiCall(
            'get',
            `/api/trips/${this.tripId}/share`
        )

        let orgName = await apiCall(
            'get',
            `/api/organization/${trip.coordinators[0].organization}/name`
        )

        this.setState({ trip, orgName })
    }

    getFormInfo = async () => {
        let formInfo = await apiCall('GET', `/api/paymentForms/${this.formId}`)

        this.setState({ formInfo })
    }

    render() {
        let { trip, orgName, formInfo } = this.state
        return (
            <div className="container-fluid">
                <div className="">
                    <div className="row d-flex justify-content-between">
                        <span className="Share-title p-2">{trip.name}</span>
                        <span className="Share-title p-2">{orgName}</span>
                    </div>
                    <div
                        className="row d-flex flex-column justify-content-between p-4"
                        style={{
                            backgroundImage: `url(${trip.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: '20vh'
                        }}
                    >
                    </div >
                    <div className="row justify-content-center">
                        <h2>Coordinator is requesting {formInfo.amount} for your {trip.name} trip.</h2>
                    </div>
                    <div className="row justify-content-center">
                        <h5>{formInfo.message}</h5>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xs-10 col-lg-3">
                            <CreateChargeForm></CreateChargeForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
