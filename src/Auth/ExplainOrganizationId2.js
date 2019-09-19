import React from 'react'
import ModalForm from '../util/forms/ModalForm'

export default function ExplainOrganizationId2() {

    const icon = 'far fa-question-circle fa-sm hover text-primary'

    return (
        <ModalForm
            icon={icon}
            header="Organization Id"
        >
            <div>Your Organization Id uniquely identifies your org within Left.
            If this is your first time using Left, click "Create a new organization". If your org already uses Left, ask your Admin for your org id.</div>
        </ModalForm>
    )
}
