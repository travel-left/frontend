import React, { Component } from 'react'
import FileUploader from '../Forms/FileUploader'
import Image from './Image'

export default class AddImage extends Component {
    state = {
        text: this.props.img === '' ? 'ADD' : 'EDIT',
        showForm: false,
        imgText: '',
        file: null
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        const { file } = this.state
        if (file) {
            this.props.submit({
                file: file,
                upload: true
            })
        } else {
            this.props.submit({
                img: this.state.imgText,
                upload: false
            })
        }
        this.setState({
            showForm: false,
            text: 'EDIT'
        })
    }

    handleError = ({ message }) => {
        this.props.submit({
            img: '',
            error: { message }
        })
    }

    handleUpload = url => {
        this.setState({
            imgText: url
        })
    }

    toggleShowForm = () => {
        const { showForm } = this.state
        this.setState({
            showForm: !showForm
        })
    }

    render() {
        const { img, name } = this.props
        const { text, showForm, imgText } = this.state

        const formButton = (
            <button className="btn btn-primary" onClick={this.toggleShowForm}>
                {text}
            </button>
        )

        const editForm = (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                    <FileUploader id="addImage" onUpload={this.handleUpload} accept="image/*" />
                    <input type="text" onChange={this.handleChange} value={imgText} className="form-control" id="imgText" name="imgText" placeholder="Image Link" aria-label="img" aria-describedby="img" />
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        )

        const formBody = showForm ? editForm : formButton

        return (
            <div className="row mx-4">
                <div className="col-8">
                    <h2 className="text-dark">{name}</h2>
                    <div className="float-right pr-3">{formBody}</div>
                </div>
                <div className="col-4">
                    <Image src={img} diameter="100px" onError={this.handleError} />
                </div>
            </div>
        )
    }
}
