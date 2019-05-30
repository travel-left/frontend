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
            <form onSubmit={this.handleSubmitEvent}>
                <h3>Add a day</h3>
                <div class="form-row">
                    <div class="form-group col-10">
                        <label htmlFor="date">Day</label>
                        <input name="date" className="form-control" type="date" value={date} style={{ width: '100%' }} onChange={this.handleInputChange} />
                    </div>
                </div>
                <button class="btn btn-lg btn-square dark pull-right"  onClick={this.handleSubmit}>SUBMIT</button>
            </form>
        )
    }
}

export default DayForm
