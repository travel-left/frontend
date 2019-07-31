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
    .min(8, 'Password must be longer than 8 characters')

export const tripStatusValidator = Yup.string()
    .matches(/(PLANNING|PLANNED|LEFT|PAST)/)
    .required()

export const tripDateTypeValidator = Yup.string()
    .matches(/(TRAVEL|MONEY|PAPERWORK|OTHER)/)
    .required()

export const descriptionValidator = Yup.string()
    .min(2, 'Please enter a longer description')
    .max(500, 'Please enter a shorter description')

export const fileValidator = Yup.string().url('Please add a valid file')

export default validator => Yup.object().shape(validator)

export const titleValidator = Yup.string()
    .min(2, 'Please enter a longer title')
    .max(50, 'Please enter a shorter title')

export const phoneValidator = Yup.string()
    .min(10, 'Please enter a longer phone number')
    .max(15, 'Please enter a shorter phone number')
