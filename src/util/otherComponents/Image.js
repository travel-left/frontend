import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Image.css'

export default class Image extends Component {

    render() {
        const { src, diameter, name, handleUpload, upload } = this.props
        const initials = name ? getInitials(name) : ''

        const pic = <div className='img-box' style={{
            height: diameter,
            width: diameter,
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }} >
            <img src={src} class="image" style={{
                height: diameter,
                width: diameter,
                boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }} />
        </div>

        const avatar = <Avatar style={{
            height: diameter,
            width: diameter,
            backgroundColor: '#83C9F4',
            fontSize: 24,
            boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}>{initials}</Avatar>

        const withUpload =
            <div
                className='img-box hover'
                onClick={handleUpload}
                style={{
                    height: diameter,
                    width: diameter,
                }} >
                {src ? <img src={src} class="image" style={{
                    height: diameter,
                    width: diameter,
                }} /> : avatar}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="img-content">
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>UPDATE</span>
                </div>
            </div>



        let image = null
        if (upload) {
            image = withUpload
        }
        else if (src) {
            image = pic
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
