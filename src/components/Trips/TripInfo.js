import React from 'react'

const TripInfo = ({name, date, image}) => {
    return (
        <div class="card" style={{border: 'none'}}>
            <img src="https://images.unsplash.com/photo-1484318571209-661cf29a69c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" class="card-img-top" style={{boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%', marginTop: '15px'}}alt="..."></img>
            <div class="card-body" style={{marginTop: '20px'}}>
                <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>Trip to South Africa</span>  
                <button className="btn btn-lg btn-square dark pull-right">Edit</button>
                <p class="card-text">Planned for sophonmores and juniors who didn't get to attend lasts year trip</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Date <span className='pull-right' style={{color: '#0B62D4'}}>Jun 31</span></li>
                <li class="list-group-item">Status <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#8ECFF5'}}>PLANNING</span></li>
                <li class="list-group-item">Total Invited <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#0F61D8'}}>215</span></li>
                <li class="list-group-item">Total Confirmed <span className='pull-right badge badge-primary badge-pill' style={{padding: '5px 10px', backgroundColor: '#0F61D8'}}>85</span></li>
            </ul>
            <div class="card-body">
                <button className="btn btn-lg btn-square light">DUPLICATE</button>
                <button className="btn btn-lg btn-square light pull-right">ARCHIVE</button>
            </div>
        </div>
    )
}

export default TripInfo