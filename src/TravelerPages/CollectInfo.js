import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Navbar from '../util/otherComponents/Navbar'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CollectBankAccount from './CollectBankAccount'
import { withRouter } from 'react-router-dom'

class CollectInfo extends Component {

    state = {
        submitted: false
    }

    sendInfo = async info => {
        const { travelerId } = this.props.match.params
        try {
            console.log(info)

            await apiCall('put', `/api/travelers/${travelerId}/`, {
                bankAccountNumber: info.bankAccount
            })

            localStorage.setItem("bankInfo", true);

            this.setState({ submitted: true })
        } catch (err) {
            //handle error with something
            alert('there was an error submitting, please refresh and try again')
        }

    }

    render() {
        const submitedBankInfo = localStorage.getItem('bankInfo')
        return (
            <>
                <Navbar></Navbar>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Card style={{ padding: 16, maxWidth: 600, marginTop: 32, }}>
                        {submitedBankInfo || this.state.submitted ?
                            <Typography variant="h5" style={{ textAlign: 'center', }}>Your account has been successfully submitted!</Typography>
                            :
                            <div style={{ display: 'flex' }}>
                                {/* COLLECT INFO FORM */}
                                <CollectBankAccount submit={this.sendInfo}></CollectBankAccount>
                            </div>
                        }
                    </Card>
                </div>
            </>
        )
    }
}

export default withRouter(CollectInfo)