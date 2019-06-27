import React, { Component } from 'react'

const DEFAULT_IMAGE = 'https://cdn.shopify.com/s/files/1/0882/1686/products/lastolite-grey-vinyl-background-275x6m-018_a36fc2d2-5860-48f1-8ec7-4b0ed98e2cf4.jpg?v=1490271176'

export default class AddImage extends Component {
    constructor(props) {
        super(props)
        const { img } = this.props
        this.state = {
            text: img === '' ? 'ADD' : 'EDIT',
            showForm: false,
            imgUrl: DEFAULT_IMAGE,
            imgText: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.submit({
            img: this.state.imgText
        })
        this.setState({
            showForm: false,
            text: 'EDIT'
        })
    }

    handleError = e => {
        e.preventDefault()
        this.props.submit({
            img: '',
            error: { message: 'Invalid image link' }
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
        const { text, showForm, imgUrl, imgText } = this.state

        const imageUrl = img === '' ? imgUrl : img

        const formButton = (
            <button className="btn btn-primary" onClick={this.toggleShowForm}>
                {text}
            </button>
        )

        const editForm = (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" onChange={this.handleChange} value={imgText} className="form-control" id="imgText" name="imgText" placeholder="Image Link" aria-label="img" aria-describedby="img" />
                    <div className="input-group-append">
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
                    <img src={imageUrl} alt="" className="rounded-circle bg-dark" style={{ objectFit: 'cover', height: '100px', width: '100px' }} onError={this.handleError} />
                </div>
            </div>
        )
    }
}
