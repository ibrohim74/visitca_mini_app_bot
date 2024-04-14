import {$authHost, $host} from "../../../utils/http/http";
import {jwtDecode} from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);

export const DeleteFavoriteAPI = async (id) => {
    try {
        const res = await $authHost.delete(`/featured/${id}`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}

export const GetFavoriteAPI = async ()=>{
    try {
        const JWT = jwtDecode(urlParams.get('token'))
        const res = await $authHost.get(`user/${JWT.userId}/featured`)
        console.log(res)
        return res
    }catch (e){
        console.log(e)
    }
}

export const GetBookingByAnnId = async (id)=>{
    try{
        const res = $host.get(`/dacha/${id}/bookings`)
        return res
    }catch (e){
        console.log(e)
    }
}