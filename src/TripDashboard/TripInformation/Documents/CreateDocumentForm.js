import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import Validator, { nameValidator } from '../../../util/validators'

const CreateDocumentForm = ({ submit }) => {
    const initialValues = {
        name: '',
        link: 'https://',
        description: ''
    }

    const schema = Validator({
        name: nameValidator,
        description: Yup.string().max(
            200,
            'Please enter a shorter description'
        ),
        link: Yup.string().required('Please select a link or file')
    })

    return (
        <ModalForm
            buttonType='add'
            header="Add a document or link"
            validationSchema={schema}
            initialValues={initialValues}
            submit={submit}
        >
            <FormField
                name="link"
                label="Upload a document*"
                type="file"
                component={Uploader}
            />
            <FormField name="name" label="Name*" placeholder="Document Name" />
            <FormField
                name="description"
                label="Description"
                component="textarea"
                placeholder="A description for your document"
                className="d-block"
            />
        </ModalForm>
    )
}

export default CreateDocumentForm
