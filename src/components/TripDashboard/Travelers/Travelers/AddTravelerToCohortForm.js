import React, { Component } from 'react'

class AddTravelerToCohortForm extends Component {
    constructor(props) {
        super(props)
    }

    handleChange = e => {
        e.preventDefault()
        this.props.submit({
            travelerId: this.props.userId
        })
    }

    render() {
        let { currentCohort, cohorts } = this.props
        let options = cohorts.map(cohort => <option value={cohort._id}>{cohort.title}</option>)

        return (
            <div>
                <select value={currentCohort} name="cohort" onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        )
    }
}

export default AddTravelerToCohortForm
