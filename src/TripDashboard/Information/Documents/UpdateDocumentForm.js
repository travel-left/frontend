import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function UpdateDocumentForm(props) {
    const initialValues = {
        ...props
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
    })

    const button = {
        classes: 'btn btn-secondary text-light',
        text: 'edit'
    }

    return (
        <ModalForm button={button} title='Edit document' validationSchema={schema} initialValues={initialValues} {...props}>
            <FormField name="name" label="Document name"></FormField>
            <FormField name="link" label="Link a document"></FormField>
            <FormField name="link" label="Upload a new document" component={Uploader} />
            <FormField name="description" label="Document description" component="textarea" placeholder="A description for your document" className='d-block' />
        </ModalForm>
    )

}