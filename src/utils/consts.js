const urlParams = new URLSearchParams(window.location.search);
export const HOME_PAGE = '/'+urlParams;
export const REQUESTS_PAGE = urlParams+'/requests';
export const BOOKINGS_PAGE = '/bookings';
export const STAT_PAGE = '/stat';
