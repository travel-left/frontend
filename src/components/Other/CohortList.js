import React, { Component } from 'react'

class CohortList extends Component {
    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.props.submit(e.target.value)
    }

    render() {
        let { currentCohort, cohortList } = this.props
        let list = cohortList.map(i => (
            <option value={i._id} key={i._id}>
                {i.title}
            </option>
        ))

        return (
            <select className='h5 ml-2' value={currentCohort._id} onChange={this.handleChange}>
                {list}
            </select>
        )
    }
}

export default CohortList
