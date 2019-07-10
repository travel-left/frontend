import React, { Component } from 'react'
import { Formik, Form } from 'formik'

class ModalForm extends Component {

    state = {
        open: false,
        transition: false
    }

    openModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
    }

    closeModal = () => {
        this.setState(prevState => ({ transition: !prevState.transition }))
        setTimeout(() => {
            this.setState(prevState => ({ open: !prevState.open, transition: !prevState.transition }))
        }, 500);
    }

    render() {
        let modalClass = this.state.open ? 'show d-block animated fadeIn' : ''
        let fadeOut = this.state.transition ? 'show d-block animated fadeOut' : ''

        let { title, validationSchema, initialValues, submit } = this.props
        return (
            <>
                <i className='hover far fa-edit fa-2x text-primary' onClick={this.openModal} ></i>
                <div class={`modal fade ${modalClass} ${fadeOut}`} style={{ filter: 'none' }}>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addnewNameModal">
                                    {title}
                                </h5>
                                <button type="button" class="close" aria-label="Close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        submit(values)
                                        this.closeModal()
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