import {jwtDecode} from "jwt-decode";
import {$host} from "../../../utils/http/http";
export const GetCurrentUser = ()=>{
    const token = new URLSearchParams(window.location.search);
    try {
        const JWT = jwtDecode(token)
        const res = $host.post(`user/${JWT.userId}`)

        return res
    }catch (e){
        console.log(e)
    }
}