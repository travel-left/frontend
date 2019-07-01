import React, { Component } from 'react'

class UpdateCoordinatorForm extends Component {

    state = {
        name: this.props.name,
        image: this.props.image,
        email: this.props.email,
        id: this.props.id,
        phone: this.props.phone
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
        let { name, email, image, id, phone } = this.state

        return (
            <>
                <button className="btn btn btn-secondary text-light" data-toggle="modal" data-target={"#editCoordinator" + id}>edit</button>
                <div class="modal fade" id={"editCoordinator" + id} tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" >
                                    Edit Coordinator
                            </h5>
                                <button type="button" class="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-10">
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={this.handleChange} type="text" class="form-control" name="name" placeholder="name" />
                                            <label htmlFor="name">Image</label>
                                            <input value={image} onChange={this.handleChange} type="text" class="form-control" name="image" placeholder="image" />
                                            <label htmlFor="name">Email</label>
                                            <input value={email} onChange={this.handleChange} type="text" class="form-control" name="email" placeholder="email" />
                                            <label htmlFor="phone">Phone</label>
                                            <input value={phone} onChange={this.handleChange} type="text" class="form-control" name="phone" placeholder="559-867-5309" />
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

export default UpdateCoordinatorForm