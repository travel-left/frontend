import axios from 'axios'

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
        return res.data
    } catch (err) {
        throw err.response.data.error
    }
}
