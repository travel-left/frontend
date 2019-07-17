import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function CreateDocumentForm({ submit }) {
    const initialValues = {
        name: '',
        link: '',
        description: ''
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
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }

    return (
        <ModalForm button={button} title='Add a document' validationSchema={schema} initialValues={initialValues} submit={submit} >
            <FormField name="link" label="Link a document" placeholder="www.linktoyourdoc.com"></FormField>
            <FormField name="link" label="Upload a document" component={Uploader} />
            <FormField name="description" label="Document description" component="textarea" placeholder="A description for your document" className='d-block' />
        </ModalForm>
    )

}