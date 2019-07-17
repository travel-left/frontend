import React, { Component } from 'react'
import { apiCall } from '../api'
import FormField from './FormField'

export default class Uploader extends Component {
    state = {
        uploading: false,
        file: '',
        filePreview: ''
    }

    handleUpload = async file => {
        this.setState({ uploading: true, file })
        let formData = new FormData()
        formData.append('file', file)
        let ret = await apiCall('post', '/api/files', formData)
        readFileAsync(file).then(data => {
            this.setState({ filePreview: data })
        })

        this.setState({ uploading: false })
        return ret.url
    }

    render() {
        let {
            form: { setFieldValue },
            field: { name, value }
        } = this.props

        let spinner = this.state.uploading ? <LoadingSpinner /> : null
        return (
            <div className="row">
                <div className="col-8">
                    <div className="input-group">
                        <input
                            id={name}
                            name={name}
                            type="file"
                            onChange={async event => {
                                let docUrl = await this.handleUpload(event.currentTarget.files[0])
                                setFieldValue(name, docUrl)
                            }}
                        />
                    </div>
                </div>
                <div className="col-4">
                    {spinner}
                    {!this.state.uploading &&
                        <img
                            src={this.state.filePreview}
                            alt={this.state.file}
                            className="img-thumbnail border-0"
                            height={200}
                            width={200}
                        />
                    }
                </div>
            </div>
        )
    }
}

const LoadingSpinner = () => (
    <i className="fa fa-spinner fa-spin" />
)

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
}