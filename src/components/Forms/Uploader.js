import React, { Component } from 'react'
import { apiCall } from '../../util/api'

export default class Uploader extends Component {
    handleUpload = async e => {
        const [file] = e.target.files
        console.log(file)
        let formData = new FormData()
        formData.append('file', file)
        let ret = await apiCall('post', '/api/files', formData)
        return ret.url
    }

    render() {
        let {
            form: { setFieldValue },
            field: { name }
        } = this.props

        return (
            <>
                <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={async event => {
                        let fileName = await this.handleUpload(event)
                        setFieldValue(name, fileName)
                    }}
                    className="form-control"
                />
            </>
        )
    }
}
