import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function ImportBulkForm({ submit }) {
    const button = {
        classes: 'btn btn-lg btn-primary text-light mx-5',
        text: 'import bulk'
    }

    const schema = Yup.object().shape({
        file: Yup.string().required()
    })

    return (
        <ModalForm
            button={button}
            header="Add Travelers via CSV"
            validationSchema={schema}
            submit={submit}
        >
            <FormField component={Uploader} name="file" label="Upload a CSV File" />
        </ModalForm>
    )
}
