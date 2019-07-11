import React, { Component } from 'react'
import { apiCall } from '../../util/api'
import { Field, ErrorMessage } from 'formik'

class Uploader extends Component {
    handleUpload = async e => {
        const [file] = e.target.files
        let formData = new FormData()
        formData.append('file', file)
        let ret = await apiCall('post', '/api/files', formData)
        return ret.url
    }

    render() {
        let { field, form: { touched, errors, setFieldValue } } = this.props

        return (
            <div>
                <span className='d-block text-danger'>
                    <ErrorMessage name="image" />
                </span>
                <label for="image">Upload an image</label>
                <input id="image" name="image" type="file" onChange={async (event) => {
                    let fileName = await this.handleUpload(event)
                    setFieldValue("image", fileName)
                }} className="form-control" />
            </div>
        )
    }
}

export default Uploader