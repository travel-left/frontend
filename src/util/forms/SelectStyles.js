export const customStyles = {
    container: (provided, state) => ({
        ...provided,
        height: '50px',
        width: '180px',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.3)',
        border: 'none',
        borderRadius: '3px'
    }),
    control: (provided, state) => ({
        ...provided,
        border: 'none'
    }),
    select: provided => ({
        ...provided,
        background: 'white',
        height: 'auto',
        border: 'none'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        border: 'none'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#333333',
        fontFamily: 'Roboto',
        fontWeight: '600'
    })
}

export const eventFormDocs = {
    container: (provided, state) => ({
        ...provided,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.3)',
        border: 'none',
        borderRadius: '3px'
    }),
    control: (provided, state) => ({
        ...provided,
        border: 'none'
    }),
    select: provided => ({
        ...provided,
        background: 'white',
        height: 'auto',
        border: 'none'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        border: 'none'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#333333',
        fontFamily: 'Roboto',
        fontWeight: '600'
    })
}

export const eventTimezone = {
    container: (provided, state) => ({
        ...provided,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.3)',
        border: 'none',
        borderRadius: '3px'
    }),
    control: (provided, state) => ({
        ...provided,
        border: 'none'
    }),
    select: provided => ({
        ...provided,
        background: 'white',
        height: 'auto',
        border: 'none'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        border: 'none'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#333333',
        fontFamily: 'Roboto',
        fontWeight: '600'
    })
}