import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentCohort } from '../../store/actions/cohort'

class DashboardHeader extends Component {
    constructor(props) {
        super(props)
    }

    updateCohort = e => {
        this.props.submit(e.target.value)
        this.props.setCurrentCohort(this.props.currentTrip.cohorts.filter(c => c._id == e.target.value)[0])
    }

    render() {
        let { title, description, currentTrip, currentCohort } = this.props
        let cohortList = null

        if (currentTrip) {
            let cohorts = currentTrip.cohorts.map(c => (
                <option value={c._id} key={c._id}>
                    {c.title}
                </option>
            ))
            cohortList = (
                <select className="h5 ml-2 float-right" value={currentCohort._id} onChange={this.updateCohort}>
                    {cohorts}
                </select>
            )
        }

        return (
            <div className="mt-4 mt-md-0">
                <h2>{title} </h2>
                {cohortList}
                <p>{description}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentCohort: state.currentCohort
    }
}

export default connect(
    mapStateToProps,
    { setCurrentCohort }
)(DashboardHeader)
