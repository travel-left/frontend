import React, { Component } from 'react'
import { apiCall } from '../../util/api'

export default class Uploader extends Component {
    state = {
        value: '',
        uploading: false
    }

    handleUpload = async e => {
        this.setState({ uploading: true })
        const [file] = e.target.files
        console.log(file)
        let formData = new FormData()
        formData.append('file', file)
        let ret = await apiCall('post', '/api/files', formData)
        this.setState({ value: ret.url, uploading: false })
        return ret.url
    }

    render() {
        let {
            form: { setFieldValue },
            field: { name }
        } = this.props

        return (
            <div className="row">
                <div className="input-group col-10">
                    <input name={name} className="form-control" type="text" placeholder="Paste a link here or upload a file" value={this.state.value} />
                    <label htmlFor={name} className="btn btn-primary hover">{label}
                        Upload
                    <input id={name} name={name} type="file" onChange={async event => {
                            let fileName = await this.handleUpload(event)
                            setFieldValue(name, fileName)
                        }} className="d-none" />
                    </label>
                </div>
                <div className="col-2">
                    {this.state.uploading ? <LoadingSpinner /> : null}
                </div>
            </div>
        )
    }
}

export default Uploader

const LoadingSpinner = () => (
    <i className="fa fa-spinner fa-spin" />
)
