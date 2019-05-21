import React from 'react'

const Trip = ({name, image, date, status}) => {

    return (
        <div className="card" style={{minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px'}}>
            <div className="row no-gutters" style={{justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center',}}>
                <div className="col-2 pull-left">
                    <img src={image} className="card-img" alt="..."></img>
                </div>
                <div className="col-2">
                    <p className="card-text" style={{padding: '15px 5px 15px 5px', fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>{name}</p>
                </div>
                <div className="col-2" >
                </div>
                <div className="col-2">
                    <p className="card-text" style={{padding: '15px 5px 15px 5px', color: '#A3A3A3'}}>June 12</p>
                </div>
                <div className="col-2">
                    <p className="card-text" style={{padding: '15px 5px 15px 5px'}}><span class="badge badge-primary badge-pill" style={{padding: '5px 10px', backgroundColor: '#8ECFF5'}}>PLANNING</span></p>
                </div>
            </div>
        </div>
    )
}

export default Trip