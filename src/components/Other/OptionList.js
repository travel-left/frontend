import React from 'react'

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
