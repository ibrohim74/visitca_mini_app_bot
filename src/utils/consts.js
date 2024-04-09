const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
export const HOME_PAGE = '/'+token;
export const REQUESTS_PAGE = token+'/requests';
export const BOOKINGS_PAGE = '/bookings';
export const STAT_PAGE = '/stat';
