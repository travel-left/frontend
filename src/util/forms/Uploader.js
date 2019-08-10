import React, { Component } from 'react'
import { Field } from 'formik'
import { apiCall } from '../api'
import { getIcon } from '../file-icons'

export default class Uploader extends Component {
    state = {
        uploading: false,
        fileUrl: this.props.form.values[this.props.field.name],
        typeLink: false,
        error: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fileUrl !== prevProps.fileUrl && prevState.error) {
            this.setState({ error: false })
        }
    }

    handleError = e => {
        e.preventDefault()
        this.setState({
            error: true
        })
    }

    handleUpload = async file => {
        this.setState({ uploading: true })
        // readFileAsync(file).then(data => {
        //     this.setState({ filePreview: data })
        // })
        let formData = new FormData()
        formData.append('file', file)
        let s3 = await apiCall('post', '/api/fileUploads/unAuth', formData)
        this.setState({ uploading: false, fileUrl: s3.url, error: false })
        return s3.url
    }

    switchType = () => {
        this.setState(prevState => ({ typeLink: !prevState.typeLink }))
    }

    render() {
        let {
            form: { setFieldValue },
            field: { name }
        } = this.props
        const { typeLink, uploading, fileUrl, error } = this.state

        const nulledUrl = fileUrl === 'https://' ? '' : fileUrl

        const displayUrl =
            error && nulledUrl !== '' ? getIcon(fileUrl) : nulledUrl

        let spinner = uploading ? <LoadingSpinner /> : null
        let component = null

        if (typeLink) {
            component = (
                <div className="col-12">
                    <Field
                        name={name}
                        type="url"
                        placeholder="https://travel-left.com"
                        className="d-block form-control"
                    />
                </div>
            )
        } else {
            component = (
                <>
                    <div className="col-8">
                        <div className="input-group">
                            <label
                                htmlFor={name}
                                className="btn btn-primary hover"
                            >
                                <input
                                    id={name}
                                    name={name}
                                    value=""
                                    type="file"
                                    onChange={async event => {
                                        let docUrl = await this.handleUpload(
                                            event.currentTarget.files[0]
                                        )
                                        setFieldValue(name, docUrl)
                                    }}
                                    className="d-none"
                                />
                                upload
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        {spinner}
                        {!this.state.uploading && (
                            <img
                                src={displayUrl}
                                className="img-thumbnail border-0"
                                height={56}
                                width={56}
                                onError={this.handleError}
                            />
                        )}
                    </div>
                </>
            )
        }

        return (
            <div className="row">
                {component}
                <button
                    className="btn btn-link mt-2"
                    onClick={this.switchType}
                    type="button"
                >
                    {typeLink ? 'Upload a file instead' : 'Link a file instead'}
                </button>
            </div>
        )
    }
}

const LoadingSpinner = () => <i className="fa fa-spinner fa-spin" />

// const readFileAsync = file => {
//     return new Promise((resolve, reject) => {
//         let reader = new FileReader()
//         reader.onloadend = () => {
//             resolve(reader.result)
//         }
//         reader.onerror = reject
//         reader.readAsDataURL(file)
//     })
// }
