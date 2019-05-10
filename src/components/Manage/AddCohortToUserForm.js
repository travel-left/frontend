import React, { Component } from 'react'

class AddCohortToUserForm extends Component {

    state = {
        cohort: ''
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitEvent = event => {
        event.preventDefault()
        this.props.submit(this.state.cohort)
    }

    render() {
        let {cohorts} = this.props
        let cohortOptions = cohorts.map(cohort => {
            return <option value={cohort._id}>{cohort.title}</option>
        })          

        return (
            <div>
                <form onSubmit={this.handleSubmitEvent}>
                    <select value={this.state.cohort} name='cohort' onChange={this.handleChange}>
                        <option value="" disabled selected>Select a Cohort</option>
                        { cohortOptions }
                    </select>
                    <button type="submit" className="btn btn-primary float-right" style={{backgroundColor: '#079992'}}>SUBMIT</button>
                </form>
            </div>
        )
    }
}

export default AddCohortToUserForm