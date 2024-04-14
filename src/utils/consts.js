const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
export const HOME_PAGE = '/';
export const BACK_HOME =`/?token=${token}`

// Seller
export const BACK_BOOKING =`/bookings/?token=${token}`
export const REQUESTS_PAGE = `/requests/`;
export const BOOKINGS_PAGE = '/bookings/';
export const BOOKINGS_ITEM_PAGE = `/bookings/:id/`;
export const STAT_PAGE = '/stat/';


//User

export const BOOKING_USER = `/bookingsUser/`
export const FAVORITES = `/favorites/`
export const FAVORITES_ITEM_PAGE = `/favorites/:id/`;
export const STORE = `/store/`