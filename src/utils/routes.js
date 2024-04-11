import {BOOKINGS_ITEM_PAGE, BOOKINGS_PAGE, HOME_PAGE, REQUESTS_PAGE, STAT_PAGE} from "./consts";
import HomePage from "../page/home_page/homePage";
import RequestsPage from "../page/requests_page/requestsPage";
import BookingsPage from "../page/bookings_page/bookingsPage";
import StatPage from "../page/stat_page/statPage";
import BookingItemPage from "../page/bookings_page/booking_item_page";

export const BOT =[
    {
        path:HOME_PAGE,
        component:<HomePage/>
    },
    {
        path:REQUESTS_PAGE,
        component:<RequestsPage/>
    },
    {
        path:BOOKINGS_PAGE,
        component:<BookingsPage/>
    },
    {
        path:BOOKINGS_ITEM_PAGE,
        component:<BookingItemPage/>
    },
    {
        path:STAT_PAGE,
        component:<StatPage/>
    },
]