import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Navbar from '../util/otherComponents/Navbar'
import Image from '../util/otherComponents/Image'
import CreateChargeForm from '../Forms/CreateChargeForm'

export default class CollectPayment extends Component {
    coordinatorId = this.props.match.params.coordinatorId
    formId = this.props.match.params.formId

    state = {
        formInfo: {},
        coordinator: {}
    }

    constructor(props) {
        super(props)

        this.getFormInfo()
        this.getCoordinatorInfo()
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
        let { formInfo, coordinator } = this.state
        return (
            <>
                <Navbar></Navbar>
                <div className="container-fluid px-0 mx-0 justify-content-center">
                    <div className="mt-5 d-flex justify-content-center">
                        <div className="row justify-content-center px-5">
                            <div className="col-2 px-0">
                                <Image src={coordinator.image} style={{ maxWidth: '20vw' }} diameter='64px'></Image>
                            </div>
                            <div className="col-10 pl-2 pr-0">
                                <span><strong>{coordinator.name}</strong> requests ${formInfo.amount} for your trip.</span>
                                <div className="mt-3">
                                    <span className='text-muted'>{formInfo.message}</span>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <CreateChargeForm coordinatorId={this.coordinatorId} formId={this.formId} amount={formInfo.amount}></CreateChargeForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
