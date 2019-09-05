import React from 'react'
import ModalForm from '../../../util/forms/ModalForm'

export default function RemoveCoordinator(props) {

    return (
        <ModalForm buttonType='edit' header="Remove coordinator from trip" {...props}>
            <p>
                Are you sure you want to remove this coordinator? Press submit
                to remove.
            </p>
        </ModalForm>
    )
}
