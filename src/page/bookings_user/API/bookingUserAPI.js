import {$authHost} from "../../../utils/http/http";
import {jwtDecode} from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);


export const GetUserBookingAPI = async () =>{
    try {
        const JWT = jwtDecode(urlParams.get('token'))
        const res = $authHost.get(`/customer/${JWT.userId}/bookings`)

        return res
    }catch (e){
        console.log(e)
    }
}