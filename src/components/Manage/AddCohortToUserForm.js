import React, { Component } from 'react'

class AddCohortToUserForm extends Component {

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
        let options = cohorts.map(cohort => (<option value={cohort._id}>{cohort.title}</option>))
        let cohortList = currentCohort
            ? 
                <select value={currentCohort._id} name='cohort' onChange={this.handleChange}>
                    {options}
                </select>
            : 
               <select name='cohort' onChange={this.handleChange}>
                    <option disabled selected >Select a cohort</option>
                    {options}
                </select>

        return (
            <div >
                {cohortList}
            </div>
        )
    }
}

export default AddCohortToUserForm