import axios from 'axios'

export const setTokenHeader = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const apiCall = async (method, path, data) => {
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

export const genericSubUpdater = async (
    baseUrl,
    originalObject,
    updateObject,
    type
) => {
    const oldChildren = originalObject[type]
    const newChildren = updateObject[type]
    const oldChildrenIds = oldChildren.map(o => o._id)
    const newChildrenIds = newChildren.map(nc => nc._id)
    const toCreate = []
    const toUpdate = []
    const toDelete = []

    for (const oldChild of oldChildren) {
        // In oldChildren but not newChildren, needs to be removed
        if (!newChildrenIds.includes(oldChild._id)) {
            toDelete.push(oldChild._id)
        }
    }

    for (const child of newChildren) {
        // Link does not have id or not in oldChilds, therefore must be added
        if (!child._id || !oldChildrenIds.includes(child._id)) {
            toCreate.push(child)
        } else if (!oldChildren.includes(child)) {
            toUpdate.push({ _id: child._id, update: child })
        }
    }

    if (toDelete.length) {
        await apiCall('delete', `${baseUrl}/${type}`, { data: toDelete })
    }

    if (toCreate.length) {
        await apiCall('post', `${baseUrl}/${type}/array`, toCreate)
    }

    if (toUpdate.length) {
        await apiCall('put', `${baseUrl}/${type}`, toUpdate)
    }

    updateObject[type] = []
    return updateObject
}
