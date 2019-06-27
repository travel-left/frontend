import React, { Component } from 'react'

export default class TextInput extends Component {
    handleChange = e => {
        this.props.change(e.target.name, e.target.value)
    }

    render() {
        const { name, value, label, type, placeholder } = this.props
        return (
            <>
                <label htmlFor={name} className="text-dark mt-2">
                    {label}
                </label>
                <input type={type} id={name} name={name} className="form-control border-top-0 border-left-0 border-right-0 form-control-lg" placeholder={placeholder} value={value} onChange={this.handleChange} />
            </>
        )
    }
}
