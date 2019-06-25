import React, { Component } from 'react'

class TripImageForm extends Component {

    state = {
        image: this.props.image
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
        this.props.submit(this.state.image)
    }

    render() {
        let { image } = this.state

        return (
            <>
                <h5 className='text-light hover' data-toggle="modal" data-target="#newImage">
                    Change cover photo {' '}
                    <i class="far fa-images"></i>
                </h5>
                <div class="modal fade" id="newImage" tabindex="-1" role="dialog" aria-labelledby="addnewImageModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewImageModal">
                                    Cover photo
                            </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="image">Image</label>
                                            <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
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

export default TripImageForm