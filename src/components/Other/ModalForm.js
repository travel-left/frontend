import React, { Component } from 'react'
import { Formik, Form } from 'formik'

class ModalForm extends Component {

    state = {
        open: false
    }

    toggleModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
    }

    render() {
        let modalClass = this.state.open ? 'modal fade show d-block' : 'modal fade'
        let { title, validationSchema, initialValues, submit, fields } = this.props
        return (
            <>
                <i className='hover far fa-edit fa-2x text-primary' onClick={this.toggleModal}></i>
                <div class={`${modalClass}`} id="newName" tabindex="-1" role="dialog" >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewNameModal">
                                    {title}
                                </h5>
                                <button type="button" class="close" aria-label="Close" onClick={this.toggleModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        submit(values)
                                        this.toggleModal()
                                    }}
                                >
                                    {(values, isSubmitting) =>
                                        <Form>
                                            {this.props.children}
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary"> Submit</button>
                                        </Form>
                                    }
                                </Formik>
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ModalForm