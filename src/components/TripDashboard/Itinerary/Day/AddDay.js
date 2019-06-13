import React, { Component } from 'react'

class AddDay extends Component {
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
            <>
                <button class="btn btn-lg btn-primary" data-toggle="modal" data-target="#newDay">
                    ADD NEW DAY
                </button>
                <div class="modal fade" id="newDay" tabindex="-1" role="dialog" aria-labelledby="addnewDayModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewDayModal">
                                    Select a day
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <h3>Add a day</h3>
                                    <div className="form-row">
                                        <div className="form-group col-10">
                                            <label htmlFor="date">Day</label>
                                            <input name="date" className="form-control" type="date" value={date} style={{ width: '100%' }} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button onClick={this.handleSubmit} type="button" class="btn btn-primary" data-dismiss="modal">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AddDay
