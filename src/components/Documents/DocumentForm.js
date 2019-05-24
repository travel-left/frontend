import React, { Component } from 'react'

class DocumentForm extends Component {
    state = {
        name: '',
        link: '',
        description: ''
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { name, link, description } = this.state
        return (
            <div>
                <h3 class="text-center">Create Document</h3>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-10">
                            <label for="name">Name</label>
                            <input value={name} onChange={this.handleChange} id="name" type="text" class="form-control" name="name" placeholder="New Document" />
                            <label for="description">Description</label>
                            <textarea value={description} onChange={this.handleChange} id="description" name="description" placeholder="Description" class="form-control" rows="3" />
                            <label for="link">Link to Document</label>
                            <input value={link} onChange={this.handleChange} type="url" id="link" class="form-control" name="link" placeholder="https://www.google.com" />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-lg" style={{ fontSize: '.9em' }}>
                        Create Document
                    </button>
                </form>
            </div>
        )
    }
}

export default DocumentForm
