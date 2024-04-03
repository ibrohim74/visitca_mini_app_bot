import {$host} from "../../../utils/http/http";
import {useTelegram} from "../../../hooks/useTelegram";
const {tg} = useTelegram()
export const LoginAPI = async (data)=>{
    try {
        const res = await $host.post("login", data);
        tg.CloudStorage.setItem("token", res.data.access_token);
        console.log(res.data);
        return res.data.access_token;
    } catch (e) {
        console.log(e)
    }
}