import React, { Component } from 'react'
import ModalForm from '../../../util/forms/ModalForm'
import Select from 'react-select'
import { apiCall } from '../../../util/api'

export default class AddFromOrgForm extends Component {
    state = {
        selectedCoordinators: [],
        coordinators: [],
        allCoordinators: []
    }

    constructor(props) {
        super(props)
        this.getCoordinators()
    }

    getCoordinators = async () => {
        const allCoordinators = await apiCall('get', '/api/coordinators')
        this.filterOnTrip(allCoordinators)
    }

    filterOnTrip = allCoordinators => {
        if (!allCoordinators) {
            allCoordinators = this.state.allCoordinators
        }
        const { onTrip } = this.props
        const onTripIds = onTrip.map(ot => ot._id)

        const coordinators = allCoordinators.filter(
            c => !onTripIds.includes(c._id)
        )

        this.setState({ coordinators, allCoordinators })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onTrip !== this.props.onTrip) {
            this.filterOnTrip()
        }
    }

    //create an array of all the selected coordinator ids
    handleCoordinatorSelection = selectedCoordinators => {
        this.setState({
            selectedCoordinators: selectedCoordinators.map(t => t.value)
        })
    }

    submit = async () => {
        const { selectedCoordinators } = this.state
        this.props.submit(selectedCoordinators)
    }

    render() {
        const button = {
            classes: 'btn btn-primary rounded-pill',
            text: 'ADD FROM ORG'
        }
        const customStyles = {
            container: provided => ({
                ...provided
            }),
            select: provided => ({
                ...provided,
                background: 'white',
                height: 'auto'
            }),
            valueContainer: provided => ({
                ...provided,
                minHeight: '50px'
            })
        }

        const { coordinators } = this.state
        return (
            <ModalForm
                button={button}
                header="Add other coordinators in your organization"
                submit={this.submit}
                submitButtonText="SUBMIT"
            >
                <span className="mt-2">Coordinators</span>
                <Select
                    isMulti
                    name="coordinators"
                    options={coordinators.map(t => ({
                        value: t._id,
                        label: `${t.name} - ${t.email}`
                    }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    placeholder="Select..."
                    onChange={this.handleCoordinatorSelection}
                />
            </ModalForm>
        )
    }
}
