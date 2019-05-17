import React from 'react'

const Cohort = ({name}) => {

    return (
        <div class="card">
        <div class="row no-gutters" style={{justifyContent: 'space-around'}}>
            <div class="col-1">
                <img src="..." class="card-img" alt="..."  style={{padding: '15px 5px 15px 5px'}}></img>
            </div>
            <div class="col-2">
                <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted">{name}</small></p>
            </div>
            <div class="col-3" style={{flexGrow: 2}}>
                <p class="card-text" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted"></small></p>
            </div>
            <div class="col-2">
            </div>
            <div class="col-2">
                <p class="card-text pull-right" style={{padding: '15px 5px 15px 5px'}}><small class="text-muted" ></small></p>
            </div>
        </div>
    </div>
    )
}

export default Cohort