import request from './request'
let dataService = {
    signUp: (apiVersion, account, phone, email, password, fullName, dob, gender, identityCard, address, description, avatar, companyName, companyAddress) => {
        let url = '/api/auth/sign-up'
        let body = {
            account,
            phone,
            email,
            password,
            fullName,
            dob,
            gender,
            identityCard,
            address,
            description,
            avatar,
            companyName,
            companyAddress
        }
        let method = 'POST'

        return request.req(url, body, apiVersion, method)
    },
    signIn: (apiVersion, account, password) => {
        let url = '/api/auth/sign-in/user'
        let body = {
            account,
            password
        }
        let method = 'POST'
        return request.req(url, body, apiVersion, method)
    },
    refreshToken: (apiVersion) => {
        let url = '/api/auth/sign-in/refresh-token'
        let body = {
        }
        let method = 'POST'
        return request.req(url, body, apiVersion, method)
    },
    logOut: () => {
        let url = '/api/auth/logout'
        let body = {
        }
        let method = 'POST'
        return request.req(url, body, 1, method)
    },
    getListHisAdd: (skip, limit, where) => {
        let url = `/api/voucherLog?skip=${skip}&limit=${limit}&where=${JSON.stringify(where)}&populate=billId`
        let body = {
        }
        let method = 'GET'
        return request.req(url, undefined, 2, method)
    }
}

export default dataService;