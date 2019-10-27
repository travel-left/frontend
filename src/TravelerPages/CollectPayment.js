import React, { Component } from 'react'
import { apiCall } from '../util/api'
import CheckoutForm from '../util/forms/CheckoutForm'
import CreateChargeForm from '../util/forms/CreateChargeForm'
import Navbar from '../util/otherComponents/Navbar'
import Image from '../util/otherComponents/Image';

export default class CollectPayment extends Component {
    tripId = this.props.match.params.tripId
    coordinatorId = this.props.match.params.coordinatorId
    formId = this.props.match.params.formId

    state = {
        trip: {},
        orgName: '',
        formInfo: {},
        coordinator: {}
    }

    constructor(props) {
        super(props)

        this.getTripInfo()
        this.getFormInfo()
        this.getCoordinatorInfo()
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
        let formInfo = await apiCall('GET', `/api/left/paymentForms/${this.formId}`)

        this.setState({ formInfo })
    }

    getCoordinatorInfo = async () => {
        let coordinator = await apiCall('GET', `/api/coordinators/${this.coordinatorId}/name`)
        this.setState({ coordinator })
    }

    render() {
        let { trip, orgName, formInfo, coordinator } = this.state
        return (
            <>
                <Navbar></Navbar>
                <div className="container-fluid px-0 mx-0 justify-content-center">
                    <div className="mt-5 d-flex justify-content-center">
                        <div className="row justify-content-center px-5">
                            <div className="col-2 px-0">
                                <Image src={coordinator.image} style={{ maxWidth: '20vw' }} diameter='48px'></Image>
                            </div>
                            <div className="col-10 pl-2 pr-0">
                                <span><strong>{coordinator.name}</strong> requests ${formInfo.amount} for {trip.name}</span>
                                <div className="mt-3">
                                    <span className='text-muted'>{formInfo.message}</span>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <CreateChargeForm coordinatorId={this.coordinatorId} amount={formInfo.amount}></CreateChargeForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
