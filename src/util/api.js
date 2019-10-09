import axios from 'axios'
import message from './message'

export const setTokenHeader = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const apiCall = async (method, path, data, msg) => {
    try {
        const res = await axios[method.toLowerCase()](
            `${process.env.REACT_APP_BACKEND_ENDPOINT}${path}`,
            data
        )
        if (msg) message('success', 'Success!')
        return res.data
    } catch (err) {
        if (msg) message('error', 'There was an error with your request.')
        return err
    }
}
