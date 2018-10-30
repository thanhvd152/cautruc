const axios = require('axios');
import config from '../config'
import api from '../api';

let request = {
    post: async (url, body, apiVersion) => {
        let option = {
            method: 'POST',
            url: config.HOST + url,
            data: body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': api.getToken(),
                // 'Accept-Language': api.getLang(),
                'Api-Version': apiVersion
            }
        }
        try {
            let response = await axios(option)
            console.log("dataPost=>", option, 'response=>', response)
            if (response.status == 200) return response.data
            api.showMessage(response.data.message)

        } catch (err) {
            console.log("dataPost=>", option)
            api.showMessage('Có lỗi xảy ra vui lòng thử lại sau')
            console.log(err)
        }

    }
}

export default request;