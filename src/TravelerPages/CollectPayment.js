import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Navbar from '../util/otherComponents/Navbar'
import Image from '../util/otherComponents/Image'
import CreateChargeForm from '../Forms/CreateChargeForm'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

export default class CollectPayment extends Component {
    coordinatorId = this.props.match.params.coordinatorId
    formId = this.props.match.params.formId

    state = {
        formInfo: {},
        coordinator: {},
        org: {},
        showSuccess: false
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
        let coordinator = await apiCall('GET', `/api/coordinators/${this.coordinatorId}`)
        let org = await apiCall('GET', `/api/organization/${coordinator.organization}`)
        this.setState({ coordinator, org })
    }

    handleSubmit = () => {
        this.setState({ showSuccess: true })
    }

    render() {
        const { formInfo, coordinator, showSuccess } = this.state
        return (
            <>
                <Navbar></Navbar>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Card style={{ padding: 16, maxWidth: 600, marginTop: 32, }}>
                        {showSuccess ? <>
                            <Typography variant="h5" style={{ textAlign: 'center', }}>Your payment has been completed!</Typography>
                        </> :
                            <div style={{ display: 'flex' }}>
                                <Image src={coordinator.image} style={{ maxWidth: '20vw', marginRight: 16 }} diameter='64px'></Image>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
                                    <span><strong>{coordinator.name}</strong> requests ${formInfo.amount} for your trip.</span>
                                    <span >{formInfo.message}</span>
                                    <CreateChargeForm orgId={this.state.org._id} formId={this.formId} amount={formInfo.amount} onSubmit={this.handleSubmit}></CreateChargeForm>
                                </div>
                            </div>
                        }
                    </Card>
                </div>
            </>
        )
    }
}
