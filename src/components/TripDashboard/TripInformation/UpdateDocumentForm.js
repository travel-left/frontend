import React, { Component } from 'react'

class UpdateDocumentForm extends Component {

    state = {
        ...this.props
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, description, link, id } = this.state

        return (
            <>
                <i class="far fa-edit fa-2x float-right text-secondary hover" data-toggle="modal" data-target={"#editDocument" + id}></i>
                <div class="modal fade" id={"editDocument" + id} tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" >
                                    Edit Document
                            </h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="Special Waiver" />
                                            <label htmlFor="description">Description</label>
                                            <input value={description} onChange={this.handleChange} type="text" class="form-control" name="description" placeholder="Lorem ipsum dolor sit." />
                                            <label htmlFor="link">Link</label>
                                            <input value={link} onChange={this.handleChange} type="text" class="form-control" name="link" placeholder="www.docs.google.com" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmit} type="button" class="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UpdateDocumentForm