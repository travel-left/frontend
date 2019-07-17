import React from 'react'
import * as Yup from 'yup'
import ModalForm from '../../util/forms/ModalForm'
import Uploader from '../../util/forms/Uploader'
import FormField from '../../util/forms/FormField';

export default function TripImageForm({ image, submit }) {
    const initialValues = {
        image
    }

    const schema = Yup.object().shape({
        image: Yup.string().required('Please upload an image')
    })

    const button = {
        classes: 'text-light hover',
        text: (
            <h5>
                Change cover photo
                <i className="far fa-images" />
            </h5>
        )
    }

    return (
        <ModalForm button={button} title="Change your trip cover photo" alidationSchema={schema} initialValues={initialValues} submit={submit}>
            <FormField name="image" label="Upload a cover photo" component={Uploader} />
        </ModalForm>
    )
}
