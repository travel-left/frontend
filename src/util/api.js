import axios from 'axios'

export const setTokenHeader = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](
            `${process.env.REACT_APP_BACKEND_ENDPOINT}${path}`,
            data
        )
            .then(res => {
                return resolve(res.data)
            })
            .catch(err => {
                return reject(err.response.data.error)
            })
    })
}

export const genericSubUpdater = async (
    baseUrl,
    originalObject,
    updateObject,
    type
) => {
    const oldChildren = originalObject[type]
    const newChildren = updateObject[type]
    await Promise.all(
        oldChildren.map(async oldChild => {
            // In oldChildren but not newChildren, needs to be removed
            if (!newChildren.includes(oldChild)) {
                await apiCall('delete', `${baseUrl}/${type}/${oldChild._id}`)
            }
        })
    )

    const oldChildrenIds = oldChildren.map(o => o._id)

    await Promise.all(
        newChildren.map(async child => {
            // Link does not have id or not in oldChilds, therefore must be added
            if (!child._id || !oldChildrenIds.includes(child._id)) {
                await apiCall('post', `${baseUrl}/${type}`, child)
            } else if (!oldChildren.includes(child)) {
                await apiCall('put', `${baseUrl}/${type}/${child._id}`, child)
            }
        })
    )

    updateObject[type] = []
    return updateObject
}
