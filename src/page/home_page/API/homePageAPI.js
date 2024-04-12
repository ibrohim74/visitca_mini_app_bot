import {jwtDecode} from "jwt-decode";
import {$host} from "../../../utils/http/http";

export const GetCurrentUser = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    try {
        const JWT = jwtDecode(token)
        const res = $host.get(`user/${JWT.userId}`)
        return res
    }catch (e){
        console.log(e)
    }
}