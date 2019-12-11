import React, { Component } from 'react'
import Image from '../util/otherComponents/Image'
import Typography from '@material-ui/core/Typography'

export default class AccountCover extends Component {
    render() {
        const { image, name } = this.props.user
        return (
            <div className="d-flex flex-column align-items-center">
                <Image src={image} diameter="128px" name={name} />
                <Typography variant="h3">Welcome, {name}</Typography>
                <Typography variant="subtitle1" style={{ marginTop: 16 }}>Manage your info, payment settings, and organization.</Typography>
            </div>
        )
    }
}
