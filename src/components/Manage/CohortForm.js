import React, { Component } from 'react'

class CohortForm extends Component {

    state = {
        title: ''
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
        this.props.submit(this.state.title)
    }

    render() {
        let {title} = this.state
        return (
            <div className="userForm">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input value={title} onChange={this.handleChange} type="text" class="form-control" name='title' placeholder="Cohort Name"/>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-lg">Add Cohort</button>
                </form>
            </div>
        )
    }
}

export default CohortForm