import React, { Component } from 'react'
import Select from 'react-select'

export default class AddFromOrg extends Component {
    state = {
        selectedTravelers: []
    }

    handleChange = travelers => {
        console.log(travelers)
    }

    handleSubmit = () => {
        console.log(this.state.selectedTravelers)
    }

    render() {
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
                minHeight: '50px',
                minWidth: '200px'
            })
        }

        const { travelers } = this.props

        return (
            <>
                <Select
                    isMulti
                    name="travelers"
                    options={travelers.map(t => ({
                        value: t._id,
                        label: `${t.name}`
                    }))}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    placeholder="Select..."
                    onChange={this.handleChange}
                />
                <button className="btn btn-lg btn-primary">ADD FROM ORG</button>
            </>
        )
    }
}
