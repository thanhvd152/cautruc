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
        return request.post(url, body, apiVersion)
    },
    signIn: (apiVersion, account, password) => {
        let url = '/api/auth/sign-in/user'
        let body = {
            account,
            password
        }
        return request.post(url, body, apiVersion)
    }
}

export default dataService;