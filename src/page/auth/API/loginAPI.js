import {$host} from "../../../utils/http/http";

export const LoginAPI = async (data)=>{
    try {
        const res = await $host.post("login", data);
        localStorage.setItem("token", res.data.access_token);
        console.log(res.data);
        return res.data.access_token;
    } catch (e) {
        console.log(e)
    }
}