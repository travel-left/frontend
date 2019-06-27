import React, { Component } from 'react'

class TripNameForm extends Component {

    state = {
        name: this.props.name
    }

    constructor(props) {
        super(props)
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
        let { name } = this.state

        return (
            <>
                <i className='hover far fa-edit fa-2x text-primary' data-toggle="modal" data-target="#newName"></i>
                <div class="modal fade" id="newName" tabindex="-1" role="dialog" aria-labelledby="addnewNameModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewNameModal">
                                    Trip name
                            </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="name" />
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

export default TripNameForm