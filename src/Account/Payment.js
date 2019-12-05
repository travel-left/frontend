import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import PaymentForm from '../Forms/PaymentForm'

export default class Payment extends Component {
    render() {
        return (
            <Card style={{ padding: 16 }}>
                <Typography variant="subtitle2">Left operates on a SaaS model. You will be charged $30 monthly.</Typography>
                <PaymentForm />
            </Card>
        )
    }
}
