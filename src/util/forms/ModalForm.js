import React, { Component } from 'react'
import { Formik, Form } from 'formik'
import Mortal from 'react-mortal'
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
        open: false
    }

    handleRemove = () => {
        this.props.remove()
        this.toggleModal()
    }

    toggleModal = () => {
        this.setState(prevState => ({ open: !prevState.open }))
    }

    render() {
        let { header, validationSchema, initialValues, submit, remove, icon, button } = this.props

        let opener = icon ? <i className={`hover ${icon}`} onClick={this.toggleModal} ></i> :
            <button className={`btn ${button.classes}`} onClick={this.toggleModal} >{button.text}</button>

        return (
            <>
                {opener}
                <Mortal
                    isOpened={this.state.open}
                    onClose={this.toggleModal}
                    motionStyle={(spring, isVisible) => ({
                        opacity: spring(isVisible ? 1 : 0),
                        modalOffset: spring(isVisible ? 0 : -90, {
                            stiffness: isVisible ? 300 : 200,
                            damping: isVisible ? 15 : 30,
                        }),
                    })}
                >
                    {(motion, isVisible) => (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                submit(values)
                                actions.setSubmitting(false)
                                actions.resetForm()
                                this.toggleModal()
                            }}
                            onReset={(values, actions) => {
                                actions.resetForm()
                                this.toggleModal()
                            }}
                        >
                            <div className='modal d-block'>
                                <div
                                    className="Modal--overlay"
                                    style={{
                                        opacity: motion.opacity,
                                        pointerEvents: isVisible ? 'auto' : 'none',
                                    }}
                                    onClick={this.toggleModal}
                                />
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content" style={{
                                        opacity: motion.opacity,
                                        transform: `translate3d(0, ${motion.modalOffset}px, 0)`,
                                    }}>
                                        <Form>
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="addnewNameModal">{header}</h5>
                                                <button type="reset" className="close" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body"> {this.props.children}</div>
                                            <hr className="mt-2" />
                                            {remove && <a className="btn btn-lg btn-danger ml-4 mb-4 text-light hover" onClick={this.handleRemove}>DELETE</a>}
                                            <button type="submit" className="btn btn-lg btn-primary float-right mr-4 mb-4">SUBMIT</button>
                                        </Form>
                                    </div>

                                </div>
                            </div>
                        </Formik>
                    )}
                </Mortal>
            </>
        )
    }
}

export default ModalForm