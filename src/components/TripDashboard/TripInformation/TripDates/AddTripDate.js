import React, { Component } from 'react'

class AddDocument extends Component {
    state = {
        name: '',
        date: '',
        type: 'TRAVEL'
    }

    constructor(props) {
        super(props)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state)
        this.setState({
            name: '',
            date: '',
            type: ''
        })
    }

    render() {
        let { name, date, type } = this.state
        return (
            <>
                <button class="btn btn btn-primary text-light mx-5 my-2" data-toggle="modal" data-target="#newTripDate">
                    add new
                </button>
                <div class="modal fade" id="newTripDate" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    Add a trip date
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label for="name">Name</label>
                                            <input value={name} onChange={this.handleChange} id="name" type="text" class="form-control" name="name" placeholder="Name" />
                                            <label for="date">Date</label>
                                            <input value={date} onChange={this.handleChange} id="date" name="date" type="date" class="form-control" />
                                            <label for="type">Type</label>
                                            <br />
                                            <select className='' value={this.state.type} onChange={this.handleChange} name="type">
                                                <option value={'TRAVEL'}>Travel date</option>
                                                <option value={'MONEY'}>Money due</option>
                                                <option value={'PAPERWORK'}>Paperwork due</option>
                                                <option value={'OTHER'}>Other date</option>
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

export default AddDocument
