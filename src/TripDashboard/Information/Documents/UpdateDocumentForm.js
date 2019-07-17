import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function UpdateDocumentForm({ submit, name, description, link, _id }) {
    const initialValues = {
        name,
        description,
        link,
        _id
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        link: Yup.string()
            .url('Please enter a proper link')
            .required('Please upload a file'),
    })

    const button = {
        classes: 'btn btn-secondary text-light',
        text: 'edit'
    }

    return (
        <ModalForm button={button} title='Add a document' validationSchema={schema} initialValues={initialValues} submit={submit} >
            <FormField name="name" label="Name" placeholder="Name of your doc" />
            <FormField name="link" label="Upload your document" value={initialValues.link} component={Uploader} />
            <FormField name="description" label="Document description" component="textarea" placeholder="A description for your document" className='d-block' />
        </ModalForm>
    )

}