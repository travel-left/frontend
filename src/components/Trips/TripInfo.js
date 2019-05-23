import React, { Component } from 'react'

class TripInfo extends Component {
    constructor(props) {
        super(props)
    }

    onEditClick = () => {
        console.log('hello')
        this.props.edit(this.props.id)
    }

    render() {
        let { name, date, image, description } = this.props

        return (
            <div class="card" style={{ border: 'none', backgroundColor: '#FBFBFB' }}>
                <img src={image} class="card-img-top" style={{ boxShadow: 'rgb(136, 136, 136) 0px 2px 4px', border: 'none', borderRadius: '0%', marginTop: '15px' }} alt="..." />
                <div class="card-body" style={{ marginTop: '20px' }}>
                    <span style={{ fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600' }}>Trip to {name}</span>
                    <button onClick={this.onEditClick} className="btn btn-lg btn-square dark pull-right">
                        Edit
                    </button>
                    <p class="card-text">{description}</p>
                </div>
                <ul class="list-group list-group-flush" style={{ backgroundColor: '#FBFBFB' }}>
                    <li class="list-group-item" style={{ backgroundColor: '#FBFBFB' }}>
                        Date{' '}
                        <span className="pull-right" style={{ color: '#0B62D4' }}>
                            {date}
                        </span>
                    </li>
                    <li class="list-group-item" style={{ backgroundColor: '#FBFBFB' }}>
                        Status{' '}
                        <span className="pull-right badge badge-primary badge-pill" style={{ padding: '5px 10px', backgroundColor: '#8ECFF5' }}>
                            PLANNING
                        </span>
                    </li>
                    <li class="list-group-item" style={{ backgroundColor: '#FBFBFB' }}>
                        Total Invited{' '}
                        <span className="pull-right badge badge-primary badge-pill" style={{ padding: '5px 10px', backgroundColor: '#0F61D8' }}>
                            215
                        </span>
                    </li>
                    <li class="list-group-item" style={{ backgroundColor: '#FBFBFB' }}>
                        Total Confirmed{' '}
                        <span className="pull-right badge badge-primary badge-pill" style={{ padding: '5px 10px', backgroundColor: '#0F61D8' }}>
                            85
                        </span>
                    </li>
                </ul>
                <div class="card-body">
                    <button className="btn btn-lg btn-square light">DUPLICATE</button>
                    <button className="btn btn-lg btn-square light pull-right">ARCHIVE</button>
                </div>
            </div>
        )
    }
}

export default TripInfo
