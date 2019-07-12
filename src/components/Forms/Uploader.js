import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { ErrorMessage } from 'formik'

class Uploader extends Component {
    handleUpload = async e => {
        const [file] = e.target.files
        let formData = new FormData()
        formData.append('file', file)
        let ret = await apiCall('post', '/api/files', formData)
        return ret.url
    }

    render() {
        let {
            label,
            form: { setFieldValue },
            field: { name }
        } = this.props
        console.log(this.props)

        return (
            <div>
                <span className="d-block text-danger">
                    <ErrorMessage name={name} />
                </span>
                <label for={name}>{label}</label>
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
            </div>
        )
    }
}

export default Uploader
