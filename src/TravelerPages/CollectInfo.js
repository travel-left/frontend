import React, { Component } from 'react'
import { apiCall } from '../util/api'
import Navbar from '../util/otherComponents/Navbar'
import Image from '../util/otherComponents/Image'
import CreateChargeForm from '../Forms/CreateChargeForm'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

export default class CollectInfo extends Component {

    sendInfo = async info => {
        try {

            localStorage.setItem("bankInfo", true);
        } catch (err) {
            //handle error with something
        }
        await apiCall('put', '/api/travelers/:id/', {
            accountNumber: info.accountNumber
        })
    }

    render() {
        // localStorage.setItem("bankInfo", true);
        const submitedBankInfo = localStorage.getItem('bankInfo')
        return (
            <>
                <Navbar></Navbar>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <Card style={{ padding: 16, maxWidth: 600, marginTop: 32, }}>
                        {submitedBankInfo ?
                            <Typography variant="h5" style={{ textAlign: 'center', }}>Your payment has been completed!</Typography>
                            :
                            <div style={{ display: 'flex' }}>
                                {/* COLLECT INFO FORM */}
                                <h3>I am the form to collect bank info</h3>
                            </div>
                        }
                    </Card>
                </div>
            </>
        )
    }
}
