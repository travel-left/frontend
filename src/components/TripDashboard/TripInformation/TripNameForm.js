import React, { Component } from 'react'
import Modal from 'react-modal'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TripNameSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
})

class TripNameForm extends Component {

    state = {
        name: this.props.name,
        open: false
    }

    toggleModal = () => {
        this.setState(prevState => {
            return {
                open: !prevState.open
            }
        })
    }

    render() {
        let { name } = this.state

        return (
            <>
                <i className='hover far fa-edit fa-2x text-primary' onClick={this.toggleModal}></i>
                <Modal
                    isOpen={this.state.open}
                    style={customStyles}
                >
                    <div className="show">
                        <div>
                            <h5 className="d-inline">Edit Trip Name</h5>
                            <button type="button" className="close hover d-flex d-row" onClick={this.toggleModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Formik
                                initialValues={{ name: this.state.name }}
                                validationSchema={TripNameSchema}
                                onSubmit={values => {
                                    this.props.submit(values)
                                    this.toggleModal()
                                }}
                            >
                                {(values, isSubmitting) =>
                                    <Form>
                                        <ErrorMessage name="name" />
                                        <label htmlFor="name">Trip name</label>
                                        <Field name="name" placeholder="Austrailia"></Field>
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary"> Submit</button>
                                    </Form>
                                }
                            </Formik>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default TripNameForm