import React, { Component } from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import DocumentUploader from '../../../util/forms/DocumentUploader'

export default class CreateDocumentForm extends Component {

    state = {
        linkFields: false
    }

    toggleLinkFields = () => {
        this.setState(prevState => {
            return { linkFields: !prevState.linkFields }
        })
    }
    initialValues = {
        name: '',
        link: '',
        description: ''
    }

    schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        link: Yup.string()
            .required('Please select a link or file')
    })

    button = {
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }

    render() {
        let { submit } = this.props

        let uploadFields = (
            <FormField name="link" label="Upload a document" type="file" component={DocumentUploader} />
        )

        let linkFields = (
            <>
                <FormField name="link" label="Documnet link" placeholder="Link"></FormField>
                <FormField name="name" label="Name for link" placeholder="Linky Boi"></FormField>
            </>
        )

        return (
            <ModalForm button={this.button} title='Add a document or link' validationSchema={this.schema} initialValues={this.initialValues} submit={submit} >
                {this.state.linkFields ? linkFields : uploadFields}
                <FormField name="description" label="Description" component="textarea" placeholder="A description for your document" className='d-block' />
                <button className="btn btn-link mt-2" onClick={this.toggleLinkFields}>{this.state.linkFields ? 'Upload' : 'Link'} a document</button>
            </ModalForm>
        )
    }

}