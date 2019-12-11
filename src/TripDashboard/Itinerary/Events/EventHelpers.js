import moment from 'moment-timezone'

let tz = moment.tz.names().map(label => {
    const offset = moment.tz(label).format('Z')
    const abbrev = moment.tz(label).format('z')
    return {
        label: `(UTC${offset}) ${label.replace('_', ' ')} (${abbrev})`,
        value: label,
        offset: offset
    }
})

export const timezones = moment.tz.names()

export const types = [
    {
        label: 'Lodging',
        value: 'LODGING'
    },
    {
        label: 'Event',
        value: 'EVENT'
    },
    {
        label: 'Transportation',
        value: 'TRANSPORTATION'
    },
    {
        label: 'Flight',
        value: 'FLIGHT'
    }
]