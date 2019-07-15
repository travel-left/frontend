import * as Yup from 'yup'

export const dateValidator = Yup.date()
    .min(new Date(), 'Please enter a date in the future')
    .required('Please enter a date')

export const nameValidator = Yup.string()
    .min(2, 'Please enter a longer name')
    .max(50, 'Please enter a shorter name')
    .required('Please enter a name')

export const tripStatusValidator = Yup.string()
    .matches(/(PLANNING|PUBLISHED|IN PROGRESS|COMPLETED)/)
    .required()

export const tripDateTypeValidator = Yup.string()
    .matches(/(TRAVEL|MONEY|PAPERWORK|OTHER)/)
    .required()

export const descriptionValidator = Yup.string()
    .min(2, 'Please enter a longer description')
    .max(500, 'Please enter a shorter description')

export const fileValidator = Yup.string().url('Please add a valid file')
