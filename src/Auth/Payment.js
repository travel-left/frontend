import React, { Component } from 'react'
import ExplainCustomerId from './ExplainCustomerId'
import YouMustPay from './YouMustPay'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import PaymentForm from './PaymentForm'

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

// {
// currentUser.stripeCustomerId === 'a' ? (
//     <div>
//         <div className="p mt-2">
//             <label className="">
//                 Customer Id{' '}
//                 <ExplainCustomerId />
//             </label>
//         </div>
//         <div className="p mt-2">
//             {currentUser.stripeCustomerId}
//         </div>
//     </div>
// ) :
//     <div>
//         <form onSubmit={this.handleCouponCode}>
//             <label htmlFor="" className="d-block">Coupon Code</label>
//             <div className="row">
//                 <div className="col-4">
//                     <input className="d-block form-control" type="text" name="couponCode" value={this.state.couponCode} onChange={this.handleChange} />
//                 </div>
//                 <div className="col-3 pl-1 ml-1">
//                     <button type="submit" className="btn btn-secondary" style={{ height: '34px' }}>SUBMIT</button>
//                 </div>
//             </div>
//         </form>
//         <CheckoutForm />
//     </div>
// }