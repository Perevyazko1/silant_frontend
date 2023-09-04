import axios from "axios";

export default class MainAPI {

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/users/api-token/`,
                {
                    'username': username,
                    'password': password
                }
            )
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}