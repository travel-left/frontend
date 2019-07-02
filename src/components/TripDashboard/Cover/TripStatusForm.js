import React, { Component } from 'react'

class TripStatusForm extends Component {
    state = {
        status: this.props.status
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.submit(this.state)
    }

    render() {
        let { status } = this.state

        return (
            <>
                <h5 className="text-light hover" data-toggle="modal" data-target="#newStatus">
                    <i class="far fa-edit pl-2"></i>
                </h5>
                <div class="modal fade" id="newStatus" tabindex="-1" role="dialog" aria-labelledby="addnewImageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewImageModal">
                                    Update trip status
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="status">Trip status</label>
                                            <br />
                                            <select className='' value={status} onChange={this.handleChange} name="status">
                                                <option value={'PLANNING'}>Planning</option>
                                                <option value={'PUBLISHED'}>Published</option>
                                                <option value={'IN PROGRESS'}>In Progress</option>
                                                <option value={'COMPLETED'}>Completed</option>
                                            </select>
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

export default TripStatusForm
