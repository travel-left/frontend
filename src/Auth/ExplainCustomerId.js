import React from 'react'
import ModalForm from '../util/forms/ModalForm'

export default function ExplainCustomerId() {

    const icon = 'far fa-question-circle fa-sm hover text-primary'

    return (
        <ModalForm
            icon={icon}
            header="Customer Id"
        >
            <div>Your Customer Id uniquely identifies your payment method on file.</div>
        </ModalForm>
    )
}
