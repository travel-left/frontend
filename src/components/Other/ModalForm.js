import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { Portal } from 'react-portal'

class ModalForm extends Component {

    state = {
        open: false,
        transition: false
    }

    openModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
        document.getElementById('app-root').classList.remove('darkFadeOut')
        document.getElementById('app-root').classList.add('darkFadeIn')
    }

    closeModal = () => {
        this.setState(prevState => ({ transition: !prevState.transition }))
        document.getElementById('app-root').classList.remove('darkFadeIn')
        document.getElementById('app-root').classList.add('darkFadeOut')
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
                <Portal>
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
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        submit(values)
                                        this.closeModal()
                                    }}
                                >
                                    {(values, isSubmitting) =>
                                        <Form style={{ fontSize: '1.2em' }}>
                                            <div class="modal-body">
                                                {this.props.children}
                                            </div>
                                            <hr className="mt-2" />
                                            <button type="submit" disabled={isSubmitting} className="btn btn-lg btn-primary float-right mr-4 mb-4">SUBMIT</button>
                                        </Form>
                                    }
                                </Formik>
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </Portal>
            </>
        )
    }
}

export default ModalForm