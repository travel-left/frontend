import React from 'react'
import Cohort from './Cohort';

const CohortList = ({cohorts}) => {
    let cohortList = cohorts.map(c => {
        return <Cohort name={c.title} />
    })
    return (
        <div className="cohortList">
            <div className="row" style={{justifyContent: 'space-around'}}>
                <div className="col-1"></div>
                <div className="col-2"><h5>Name</h5></div>
                <div className="col-3"><h5></h5></div>
                <div className="col-2"><h5></h5></div>
                <div className="col-2"><h5></h5></div>
            </div>
            <hr/>
            <ul class="list-group" style={{display: 'flex', flexDirection: 'column'}}>
                {cohortList}
            </ul>
        </div>
    )
}

export default CohortList