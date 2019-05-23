import React, { Component } from 'react'
import './Trip.css'

class Trip extends Component {
    constructor(props) {
        super(props)
    }

    onTripClick = () => {
        this.props.clicked(this.props.id)
    }

    render() {
        let { name, image, date, status } = this.props

        return (
            <div className="card" onClick={this.onTripClick} style={{ minHeight: '80px', boxShadow: 'rgb(136, 136, 136) 0px 0px 8px', marginBottom: '10px' }}>
                <div className="row no-gutters" style={{ justifyContent: 'space-around', height: '100px', flexDirection: 'row', alignItems: 'center' }}>
                    <div className="col-2 pull-left">
                        <img src={image} className="card-img" alt="..." style={{ maxHeight: '90px' }} />
                    </div>
                    <div className="col-2 hover">
                        <p className="card-text" style={{ padding: '15px 5px 15px 5px', fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600' }}>
                            {name}
                        </p>
                    </div>
                    <div className="col-2 hover" style={{ height: '100%' }} />
                    <div className="col-2">
                        <p className="card-text" style={{ padding: '15px 5px 15px 5px', color: '#A3A3A3' }}>
                            {date}
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text" style={{ padding: '15px 5px 15px 5px' }}>
                            <span class="badge badge-primary badge-pill" style={{ padding: '5px 10px', backgroundColor: '#8ECFF5' }}>
                                {status}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Trip
