import React, { Component } from 'react'
import ModalForm from '../../util/forms/ModalForm'
import FormField from '../forms/FormField'
import Select from 'react-select'
import CheckBox from '../../util/forms/Checkbox'
import { apiCall } from '../../util/api'
import * as Yup from 'yup'

export default class ShareTrip extends Component {
    tripId = this.props.tripId
    tripLink = `Here's a link to your trip! ${process.env.REACT_APP_BASE_URL}/trips/${
        this.tripId
        }/share`

    state = {
        selectedTravelers: [],
        commType: 'text', //sets the communication type to email or text
        tripLink: false
    }

    //create an array of all the selected traveler ids
    handleTravelerSelection = selectedTravelers => {
        this.setState({
            selectedTravelers: selectedTravelers.map(t => t.value)
        })
    }

    //conditionally send a text or email with/withou the trip link
    submit = async object => {
        object.body += this.state.tripLink ? this.tripLink : ''
        this.state.commType === 'text'
            ? await this.textSelectedTravelers(object)
            : await this.emailSelectedTravelers(object)
        this.setState({
            selectedTravelers: [],
            commType: 'text',
            tripLink: false
        })
    }

    toggleCheckbox = () => {
        this.setState(prevState => ({
            ...prevState,
            tripLink: !prevState.tripLink
        }))
    }

    toggleCommType = object => {
        this.setState({ commType: object.value })
    }

    textSelectedTravelers = async text => {
        const { travelers } = this.props

        await apiCall('post', '/api/communicate/text', {
            body: text.body,
            phones: travelers.map(t =>
                this.state.selectedTravelers.includes(t._id) ? t.phone : null
            )
        }, true)
    }

    emailSelectedTravelers = async email => {
        const { travelers } = this.props

        await apiCall('post', '/api/communicate/email', {
            subject: email.subject,
            body: email.body,
            emails: travelers.map(t =>
                this.state.selectedTravelers.includes(t._id) ? t.email : null
            )
        }, true)
    }

    render() {
        const icon = <i class="material-icons bg-primary Cover-share-trip d-flex align-items-center justify-content-center hover">send</i>
        const customStyles = {
            container: (provided, state) => ({
                ...provided
            }),
            select: provided => ({
                ...provided,
                background: 'white',
                height: 'auto'
            }),
            valueContainer: (provided, state) => ({
                ...provided,
                minHeight: '50px'
            })
        }
        const types = [
            {
                label: 'Text',
                value: 'text'
            },
            {
                label: 'Email',
                value: 'email'
            }
        ]

        const emailSchema = Yup.object().shape({
            subject: Yup.string()
                .min(2, 'Please enter a longer subject')
                .max(200, 'Please enter a shorter subject')
                .required('Please enter a subject'),
            body: Yup.string()
                .min(2, 'Please enter a longer body')
                .max(5000, 'Please enter a shorter body')
                .required('Please enter a body')
        })

        const textSchema = Yup.object().shape({
            body: Yup.string()
                .min(2, 'Please enter a longer body')
                .max(400, 'Please enter a shorter body')
                .required('Please enter a body')
        })

        //email or text fields
        let commFields =
            this.state.commType === 'text' ? (
                <FormField
                    name="body"
                    label="Body*"
                    component="textarea"
                    placeholder="Your text body"
                    className="d-block"
                />
            ) : (
                    <>
                        <FormField
                            name="subject"
                            label="Subject*"
                            placeholder="Your email subject"
                        />
                        <FormField
                            name="body"
                            label="Body*"
                            component="textarea"
                            placeholder="Your email body"
                            className="d-block"
                        />
                    </>
                )
        return (
            <ModalForm
                mIcon={icon}
                header="Message your travelers"
                submit={this.submit}
                submitButtonText="SEND"
                validationSchema={
                    this.state.commType === 'text' ? textSchema : emailSchema
                }
            >
                <label className="mt-2">Travelers</label>
                <Select
                    isMulti
                    name="travelers"
                    options={this.props.travelers.map(t => ({
                        value: t._id,
                        label: t.name
                    }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    placeholder="Select..."
                    onChange={this.handleTravelerSelection}
                />
                <label className="mt-3">Send as</label>
                <div className="row d-flex align-items-center">
                    <div className="col-md-4">
                        <Select
                            name="type"
                            options={types}
                            defaultValue={types[0]}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customStyles}
                            placeholder="Msg type..."
                            onChange={this.toggleCommType}
                        />
                    </div>
                </div>
                {commFields}

                <CheckBox
                    name="linkTrip"
                    label="Share trip link"
                    className="text-primary mt-3"
                    checked={this.state.tripLink}
                    onChange={this.toggleCheckbox}
                />
            </ModalForm>
        )
    }
}
