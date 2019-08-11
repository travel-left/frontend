import React from 'react'
import ModalForm from '../util/forms/ModalForm'

export default function ExplainOrganizationId() {

    const icon = 'far fa-question-circle fa-sm hover text-primary'

    return (
        <ModalForm
            icon={icon}
            header="Organization Id"
        >
            <div>Your Organization Id uniquely identifies your organization.  
            If you want to add someone to your organization, they will need
            this Id to sign up.  It is the same for all of your coordinators.</div>
        </ModalForm>
    )
}
