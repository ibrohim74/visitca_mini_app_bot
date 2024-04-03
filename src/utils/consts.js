
let HOME_PAGE;
let LOGIN;
const tg = window.Telegram.WebApp

const token = tg.CloudStorage.getItem('token');
if (token) {
    HOME_PAGE = '/';
    LOGIN = '/login';
} else {
    HOME_PAGE = '/home';
    LOGIN = '/';
}

export { HOME_PAGE, LOGIN };
