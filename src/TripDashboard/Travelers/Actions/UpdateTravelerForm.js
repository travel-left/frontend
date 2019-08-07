import React from "react";
import * as Yup from "yup";
import FormField from "../../../util/forms/FormField";
import ModalForm from "../../../util/forms/ModalForm";
import Uploader from "../../../util/forms/Uploader";
import SelectField from "../../../util/forms/SelectField";

export default function UpdateTravelerForm(props) {
    const initialValues = {
        ...props
    };

    const schema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Please enter a longer name")
            .max(50, "Please enter a shorter name")
            .required("Please enter a name"),
        email: Yup.string().email("please enter a valid email")
    });

    const button = {
        classes: "btn btn-lg btn-secondary text-light float-right px-4",
        text: 'EDIT'
    }

    return (
        <ModalForm
            button={button}
            header="Edit traveler"
            validationSchema={schema}
            initialValues={initialValues}
            {...props}
        >
            <FormField name="name" label="Name" placeholder="Steve Jobs" />
            <SelectField
                name="status"
                options={[
                    { label: "INVITED", value: "INVITED" },
                    { label: "CONFIRMED", value: "CONFIRMED" },
                    { label: "ON-TRIP", value: "ON-TRIP" },
                    { label: "POST-TRIP", value: "POST-TRIP" }
                ]}
                label="Status"
            />
            <FormField name="image" label="Upload a new image" component={Uploader} />
            <FormField
                name="email"
                label="Email"
                placeholder="steve@apple.com"
                type="email"
            />
            <FormField
                name="phone"
                label="Phone number"
                placeholder="559-867-5309"
                type="text"
            />
            <FormField
                name="personalNotes"
                label="Personal notes"
                component="textarea"
                placeholder="Any extra notes about this traveler"
                className="d-block"
            />
        </ModalForm>
    );
}
