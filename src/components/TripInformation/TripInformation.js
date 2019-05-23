import React, {Component} from 'react'
import Alert from '../Other/Alert'

class TripInformation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <Alert />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h2>Trip Information</h2>
                        <p>Edit your trip information here</p>
                        <div class="card" style={{border: 'none', backgroundColor: '#FBFBFB'}}>
                            <div class="card-body" style={{marginTop: '20px'}}>
                                <span style={{fontSize: '1.3em', color: '#3A3A3A', fontWeight: '600'}}>Trip to </span>  
                                <button onClick={this.onEditClick} className="btn btn-lg btn-square dark pull-right">Edit</button>
                                <p class="card-text">Planned for sophonmores and juniors who didn't get to attend lasts year trip</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TripInformation
