import React, { Component } from 'react'

class AddCohortToUserForm extends Component {

    state = {
        cohort: ''
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        e.preventDefault()
        this.props.submit({
            cohort_id: e.target.value,
            id: this.props.userId
        })
    }

    render() {
        let {currentCohort, cohorts} = this.props
        let cohortList = cohorts.map(cohort => {
            console.log('the selected cohort is ' + cohort.title)
            return <option value={cohort._id}>{cohort.title}</option>
        })

        return (
            <div>
                <select value={currentCohort._id} name='cohort' onChange={this.handleChange}>
                    { cohortList }
                </select>
            </div>
        )
    }
}

export default AddCohortToUserForm