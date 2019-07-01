import React, { Component } from 'react'
import { apiCall } from '../../util/api'

export default class FileUploader extends Component {
    handleUpload = async e => {
        const [file] = e.target.files
        let formData = new FormData()
        formData.append('file', file)
        const { isAuth } = this.props
        let ret = null
        if (isAuth) {
            ret = await apiCall('post', '/api/files', formData)
        } else {
            ret = await apiCall('post', '/api/files/unAuth', formData)
        }

        this.props.onUpload(ret.url)
    }

    render() {
        const { accept } = this.props

        return (
            <label class="btn btn-primary" for="uploader">
                <input id="uploader" type="file" class="d-none" onChange={this.handleUpload} accept={accept} />
                Upload
            </label>
        )
    }
}
