import {$authHost, $host} from "../../../utils/http/http";
import {jwtDecode} from "jwt-decode";
const urlParams = new URLSearchParams(window.location.search);

export const GetAnnouncementById = (id) => {
    try {
        const res = $host.get(`/dacha/${id}`)
        return res
    } catch (e) {
        console.log(e)
    }
}
export const GetReviewAPI = async (dacha) => {
    try {
        const res = await $authHost.get(`/dacha/${dacha.id}/reviews`)
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}
export const GetBookingsByAccId = async (id) => {
    try {
        const res = await $authHost.get(`/dacha/${id}/bookings`)
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}
export const GetBookingsBySellerID = async () => {
    const JWT = jwtDecode(urlParams.get('token'))
    try {
        const res = await $authHost.get(`/seller/${JWT.userId}/bookings`)
        console.log(res)
        return res
    } catch (e) {
        console.log(e)
    }
}