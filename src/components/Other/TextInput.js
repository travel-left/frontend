import React, { Component } from 'react'

export default class TextInput extends Component {
    handleChange = e => {
        this.props.change(e.target.name, e.target.value)
    }

    render() {
        const { name, value, label, type, placeholder, classes } = this.props

        const stringClasses = classes.join(' ')

        return (
            <>
                <label htmlFor={name} className="text-dark mt-2">
                    {label}
                </label>
                <input type={type} id={name} name={name} className={stringClasses} placeholder={placeholder} value={value} onChange={this.handleChange} />
            </>
        )
    }
}
