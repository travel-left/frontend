import axios from 'axios'

export const setTokenHeader = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method](`https://left-backend.herokuapp.com${path}`, data)
        // return axios[method](path, data)
            .then(res => {
                return resolve(res.data)
            })
            .catch(err => {
                return reject(err.response.data.error)
            })
    })
}

export async function getBackground(location){
    return fetch(`https://api.unsplash.com/photos/random?query=${location}`, {
      method: 'get',
      headers: new Headers({
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID 9d726df719ec922b6c26d2da35bfe40b42b0c09142889991d8be20ab4e1f9704'
      })
    })
    .then(response => {
      if(!response.ok) {
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server not responding'};
          throw err;
        }
      }
      return response.json()
    })
}
  