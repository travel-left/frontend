import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import DocumentUploader from '../../../util/forms/DocumentUploader'

export default function UpdateDocumentForm(props) {
    const initialValues = {
        ...props
    }

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Please enter a longer name')
            .max(50, 'Please enter a shorter name')
            .required('Please enter a name')
    })

    const button = {
        classes: 'btn btn-dark rounded-pill',
        text: 'EDIT'
    }

    let fields = props.link.includes(
        'travel-left-images.s3.us-east-2.amazonaws.com'
    ) ? (
            <FormField
                name="link"
                label="Upload a new document"
                component={DocumentUploader}
            />
        ) : (
            <FormField name="link" label="Link" />
        )
    return (
        <ModalForm
            button={button}
            header="Edit document"
            validationSchema={schema}
            initialValues={initialValues}
            {...props}
        >
            <FormField name="name" label="Name" />
            {fields}
            <FormField
                name="description"
                label="Document description"
                component="textarea"
                placeholder="A description for your document"
                className="d-block"
            />
        </ModalForm>
    )
}
