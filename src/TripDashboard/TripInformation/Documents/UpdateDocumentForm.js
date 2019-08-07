import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'
import Validator, { nameValidator } from '../../../util/validators'

const UpdateDocumentForm = props => {
    const initialValues = {
        ...props
    }

    const schema = Validator({
        name: nameValidator,
        link: Yup.string().required('Please select a link or file')
    })

    const icon = 'hover far fa-2x fa-edit text-secondary float-right'

    return (
        <ModalForm
            icon={icon}
            header="Add a document or link"
            validationSchema={schema}
            initialValues={initialValues}
            submit={props.submit}
            remove={props.remove}
        >
            <FormField
                name="link"
                label="Upload a document"
                type="file"
                component={Uploader}
            />
            <FormField name="name" label="Name" placeholder="Document Name" />
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

export default UpdateDocumentForm
