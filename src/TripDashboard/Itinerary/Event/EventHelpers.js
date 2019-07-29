import {
    nameValidator,
    dateValidator,
    fileValidator,
    descriptionValidator
} from '../../../util/validators'
import * as Yup from 'yup'
import moment from 'moment-timezone'

let tz = moment.tz.names().map(name => {
    const offset = moment.tz(name).format('Z')
    const abbrev = moment.tz(name).format('z')
    return {
        name: `(UTC${offset}) ${name.replace('_', ' ')} (${abbrev})`,
        value: name,
        offset: offset
    }
})

export const timezones = tz.sort((f, s) => {
    return parseInt(f.offset, 10) - parseInt(s.offset, 10)
})

export const types = [
    {
        name: 'Category',
        value: '',
        hidden: true
    },
    {
        name: 'Lodging',
        value: 'LODGING'
    },
    {
        name: 'Event',
        value: 'EVENT'
    },
    {
        name: 'Transportation',
        value: 'TRANSPORTATION'
    },
    {
        name: 'Flight',
        value: 'FLIGHT'
    }
]

export const schema = Yup.object().shape({
    name: nameValidator,
    tzStart: Yup.string('Time zone must be a string'),
    tzEnd: Yup.string('Time zone must be a string'),
    category: Yup.string('Category must be a string'),
    description: descriptionValidator,
    image: fileValidator,
    link: Yup.string('Link must be a string'),
    linkDescription: Yup.string('Link text must be a string'),
    dateStart: dateValidator,
    address: Yup.string('Address must be a string'),
    timeStart: Yup.string('Time is not valid'),
    dateEnd: dateValidator,
    timeEnd: Yup.string('Time is not valid')
})
