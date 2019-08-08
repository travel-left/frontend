import React from 'react'
import * as Yup from 'yup'
import FormField from '../../../util/forms/FormField'
import ModalForm from '../../../util/forms/ModalForm'
import Uploader from '../../../util/forms/Uploader'

export default function ImportBulkForm({ submit }) {
    const button = {
        classes: 'btn btn-lg btn-secondary text-light mx-5',
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
            <label className="d-block">Download a Template CSV File</label>
            <a
                href="https://travel-left-images.s3.us-east-2.amazonaws.com/UploadTravelers.csv"
                className="btn btn-primary"
            >
                Download
            </a>
            <FormField
                component={Uploader}
                name="file"
                label="Upload a CSV File"
            />
        </ModalForm>
    )
}
