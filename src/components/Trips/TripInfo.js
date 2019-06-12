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
        let { name, date, image, description, status } = this.props

        return (
            <div className="pb-3">
                <img src={image} className="card-img-top border-0 shadow mb-4" alt="..."></img>
                <div className='container'>
                    <span className='h4'>Trip to {name}</span>  
                    <button onClick={this.onEditClick} className="btn btn-lg btn-primary float-right">Edit</button>
                    <p className="py-3">{description}</p>
                    <ul className="list-group list-group-flush px-0 mx-0 pb-4">
                        <li className="list-group-item">
                            Date{' '}
                            <span className="float-right text-primary">
                                {date}
                            </span>
                        </li>
                        <li className="list-group-item">
                            Status{' '}
                            <span className="float-right badge badge-primary badge-pill">
                                {status}
                            </span>
                        </li>
                        <li className="list-group-item">
                            Total Invited{' '}
                            <span className="float-right badge badge-primary badge-pill">
                                215
                            </span>
                        </li>
                        <li className="list-group-item">
                            Total Confirmed{' '}
                            <span className="float-right badge badge-primary badge-pill">
                                85
                            </span>
                        </li>
                    </ul>
                    <button className="btn btn-secondary">DUPLICATE</button>
                    <button className="btn btn-dark float-right">ARCHIVE</button>
                </div>
            </div>
        )
    }
}

export default TripInfo
