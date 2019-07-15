import React, { Component } from 'react'
import * as Yup from 'yup'
import FormField from '../../../Forms/FormField'
import ModalForm from '../../../Forms/ModalForm'
import Uploader from '../../../Other/Uploader'

export default function AddDocument({ submit }) {
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
            <FormField name="name" label="Name" placeholder="Name of your doc" />
            <FormField name="link" label="Upload your document" component={Uploader} />
            <FormField name="description" label="Document description" component="textarea" placeholder="A description for your document" className='d-block' />
        </ModalForm>
    )
}
