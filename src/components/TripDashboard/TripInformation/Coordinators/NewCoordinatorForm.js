import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../Forms/FormField'
import ModalForm from '../../../Forms/ModalForm'
import Uploader from '../../../Other/Uploader'

export default function NewCoordinatorForm({ submit }) {
    const initialValues = {
        name: '',
        img: '',
        email: '',
        title: '',
        phone: ''
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name'),
        email: Yup.string()
            .email('Please enter a valid email'),
        img: Yup.string()
            .required('Please enter an image')
    })

    const button = {
        classes: 'btn btn-primary mb-4',
        text: 'add new'
    }


    return (
        <ModalForm button={button} title='Add a new coordinator to your trip' validationSchema={schema} initialValues={initialValues} submit={submit} >
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <FormField name="img" label="Photo" type="file" component={Uploader} />
            <FormField name="email" label="Email" placeholder="steve@apple.com" type="email" />
            <FormField name="phone" label="Phone number" placeholder="559-867-5309" type="phone" />
            <FormField name="title" label="Title" placeholder="CEO" />
        </ModalForm>
    )
}
