const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
export const HOME_PAGE = '?tgWebAppStartParam='+token;
export const BACK_HOME =`/${urlParams}`
export const REQUESTS_PAGE = '/requests';
export const BOOKINGS_PAGE = '/bookings';
export const STAT_PAGE = '/stat';
