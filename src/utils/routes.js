import {
    BOOKING_USER,
    BOOKINGS_ITEM_PAGE,
    BOOKINGS_PAGE,
    FAVORITES,
    HOME_PAGE,
    REQUESTS_PAGE,
    STAT_PAGE, STORE
} from "./consts";
import HomePage from "../page/home_page/homePage";
import RequestsPage from "../page/requests_page/requestsPage";
import BookingsPage from "../page/bookings_page/bookingsPage";
import StatPage from "../page/stat_page/statPage";
import BookingItemPage from "../page/bookings_page/booking_item_page";
import BookingUser from "../page/bookings_user/bookingUser";
import Favorites from "../page/Favorites/favorites";
import Store from "../page/store/store";

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

    // USER

    {
        path:BOOKING_USER,
        component:<BookingUser/>
    },
    {
        path:FAVORITES,
        component:<Favorites/>
    },
    {
        path:STORE,
        component:<Store/>
    },
]