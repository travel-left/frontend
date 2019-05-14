import React from 'react'

const CohortList = ({cohorts}) => {
    let cohortList = cohorts.map(cohort => {
        return <h2>{cohort.title}</h2>
    })
    return (
        <div className="cohortList">
            <h2>Cohorts</h2>
            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                {cohortList}
            </ul>
        </div>
    )
}

export default CohortList