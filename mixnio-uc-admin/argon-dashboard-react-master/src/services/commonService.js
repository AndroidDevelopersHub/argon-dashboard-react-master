import axios from "axios";
import {API_BASE_URL} from "../helper/env";


export const getTableData = (url, paramsObj = {}) => {

    return new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}${url}`, {
            params: paramsObj, headers: {}
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.error(err)
            reject(err.message)
        })
    })
}



export const updateData = (url, formData , paramsObj) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_BASE_URL}${url}`, {},{
            params: paramsObj, headers: {}
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.error(err)
            reject(err.message)
        })
    })
}


export const deleteData = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_BASE_URL}${url}`, ).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.error(err)
            reject(err.message)
        })
    })
}


