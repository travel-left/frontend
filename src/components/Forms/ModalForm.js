import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import { Portal } from 'react-portal'

// EXPECTED PROPS:
//     title: this is the title of the modal
//     validationSchema: this is a yup validation validationSchema
//     initialValues: the initial values of the form
//     submit: a function to be executed on submission of the form
//     icon/button: the component expects either icon or button props
//         icon is expected to be a font awesome icon classes string
//         button is an object with
//         {
//             classes: the classes you want applied to the button,
//             text: the text you want displayed on the button
//         }

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
        let { title, validationSchema, initialValues, submit, icon, button } = this.props

        let opener = icon ? <i className={`hover ${icon}`} onClick={this.openModal} ></i> :
            <button className={`btn ${button.classes}`} onClick={this.openModal} >{button.text}</button>
        return (
            <>
                {opener}
                <Portal>
                    <div className={`modal fade ${modalClass} ${fadeOut}`} style={{ filter: 'none' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addnewNameModal">
                                        {title}
                                    </h5>
                                    <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
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
                                            <div className="modal-body">
                                                {this.props.children}
                                            </div>
                                            <hr className="mt-2" />
                                            <button type="submit" disabled={isSubmitting} className="btn btn-lg btn-primary float-right mr-4 mb-4">SUBMIT</button>
                                        </Form>
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Portal>
            </>
        )
    }
}

export default ModalForm