import * as Yup from 'yup'

export const dateValidator = Yup.date()
    .min(new Date(), 'Please enter a date in the future')
    .required('Please enter a date')

export const nameValidator = Yup.string()
    .min(2, 'Please enter a longer name')
    .max(50, 'Please enter a shorter name')
    .required('Please enter a name')

export const emailValidator = Yup.string()
    .email('Must be a valid email')
    .required('Please enter an email')

export const passwordValidator = Yup.string()
    .required('Please enter a password')

export const tripStatusValidator = Yup.string()
    .matches(/(PLANNING|COMPLETED|LEFT|PAST)/)
    .required()

export const tripDateTypeValidator = Yup.string()
    .matches(/(TRAVEL|MONEY|PAPERWORK|OTHER)/)
    .required()

export const descriptionValidator = Yup.string()
    .min(2, 'Please enter a longer description')
    .max(500, 'Please enter a shorter description')

export const fileValidator = Yup.string().url('Please add a valid file')

export const urlValidator = Yup.string().url('Please add a valid url')

export default validator => Yup.object().shape(validator)

export const titleValidator = Yup.string()
    .min(2, 'Please enter a longer title')
    .max(50, 'Please enter a shorter title')

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const phoneValidator = Yup.string().matches(
    phoneRegExp,
    'Phone number is not valid'
)

export const match = function (key, message, func) {
    const notNullMessage = message || 'Values do not match'
    const notNullFunc =
        func ||
        function (value) {
            return value === this.parent[key]
        }

    return Yup.mixed()
        .test('match', notNullMessage, notNullFunc)
        .required(notNullMessage)
}
