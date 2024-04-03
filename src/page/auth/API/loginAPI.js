import {$host} from "../../../utils/http/http";
const tg = window.Telegram.WebApp
export const LoginAPI = async (data)=>{
    try {
        const res = await $host.post("login", data);
        window.localStorage.setItem("token", res.data.access_token);
        console.log(res.data);
        return res.data.access_token;
    } catch (e) {
        console.log(e)
    }
}