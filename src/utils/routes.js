import {BOOKINGS_PAGE, HOME_PAGE, REQUESTS_PAGE, STAT_PAGE} from "./consts";
import HomePage from "../page/home_page/homePage";
import RequestsPage from "../page/requests_page/requestsPage";
import BookingsPage from "../page/bookings_page/bookingsPage";
import StatPage from "../page/stat_page/statPage";

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
        path:STAT_PAGE,
        component:<StatPage/>
    },
]