import React, { Component } from 'react'

class DayForm extends Component {
    state = {
        date: String
    }

    constructor(props) {
        super(props)
    }

    handleInputChange = e => {
        this.setState({
            date: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state.date)
    }

    render() {
        let { date } = this.state.date

        return (
            <div className="date-form">
                <form onSubmit={this.handleSubmitEvent} className="form-inline">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Select a date</h6>
                            <h5 class="card-title">
                                <input name="date" className="form-control" type="date" value={date} style={{ width: '100%' }} onChange={this.handleInputChange} />
                            </h5>
                            <button class="btn btn-md" style={{ backgroundColor: '#38ada9', color: 'white' }} onClick={this.handleSubmit}>
                                <i class="fa fa-plus-square" aria-hidden="true" /> SUBMIT
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default DayForm
