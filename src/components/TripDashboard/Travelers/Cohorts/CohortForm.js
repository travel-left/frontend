import React, { Component } from 'react'

class CohortForm extends Component {

    state = {
        title: '',
        itinerary: {},
        travelers: [],
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
        this.setState({ title: '' })
    }

    render() {
        let { title } = this.state
        return (
            <form onSubmit={this.handleSubmit} style={{ marginTop: '60px' }}>
                <h3>Add a cohort</h3>
                <div class="form-row">
                    <label htmlFor="title">Cohort name</label>
                    <input value={title} onChange={this.handleChange} type="text" class="form-control" name="title" placeholder="Cohort Name" />
                </div>
                <button type="submit" class="btn btn-lg btn-primary">
                    Add Cohort
                </button>
            </form>
        )
    }
}

export default CohortForm
