import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Image.css'
import Typography from '@material-ui/core/Typography'

export default class Image extends Component {

    render() {
        const { src, diameter, name, handleUpload, upload } = this.props
        const initials = name ? getInitials(name) : ''

        const pic = <div className='img-box' style={{
            height: diameter,
            width: diameter,
        }} >
            <img src={src} class="image" style={{
                height: diameter,
                width: diameter,
            }} />
        </div>

        const avatar = <Avatar style={{
            height: diameter,
            width: diameter,
            backgroundColor: '#83C9F4',
            fontSize: 24
        }}>{initials}</Avatar>

        const withUpload = <div className='img-box hover' onClick={handleUpload} style={{
            height: diameter,
            width: diameter,
        }} >
            {src ? <img src={src} class="image" style={{
                height: diameter,
                width: diameter,
            }} /> : avatar}
            <div class="img-content d-flex justify-content-center align-items-center">
                <span style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>UPDATE</span>
            </div>
        </div>



        let image = null

        if (src) {
            image = pic
        } else if (upload) {
            image = withUpload
        } else {
            image = avatar
        }

        return image
    }
}

const getInitials = name => {
    const nameArray = name.split(' ')
    if (nameArray.length > 2) {
        return name.charAt(0)
    }
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
}
