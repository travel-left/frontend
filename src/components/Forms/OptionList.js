import React from 'react'

/**
 * Displays a list of options based on the options object given.
 * @param {{options: {name: string!, value: string!, default: boolean, hidden: boolean}}} props
 */
const OptionList = ({ options }) => {
    let optionList = options.map((option, key) => {
        if (option.disabled && option.hidden) {
            return (
                <option key={key} value={option.value} default hidden>
                    {option.name}
                </option>
            )
        } else if (option.disabled) {
            return (
                <option key={key} value={option.value} hidden>
                    {option.name}
                </option>
            )
        } else if (option.default) {
            return (
                <option key={key} value={option.value} default>
                    {option.name}
                </option>
            )
        }
        return (
            <option key={key} value={option.value}>
                {option.name}
            </option>
        )
    })
    return optionList
}

export default OptionList
