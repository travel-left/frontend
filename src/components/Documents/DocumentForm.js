import React, { Component } from 'react'

class DocumentForm extends Component {
    state = {
        name: '',
        link: ''
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
        let { name, link } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-row">
                    <div class="form-group col-10">
                        <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="New Form" />
                        <input value={link} onChange={this.handleChange} type="url" class="form-control" name="link" placeholder="https://www.google.com" />
                    </div>
                </div>
                <button type="submit" class="btn btn-lg" style={{ fontSize: '.9em' }}>
                    Create Document
                </button>
            </form>
        )
    }
}

export default DocumentForm
