let HOME_PAGE;
let LOGIN;

const token = localStorage.getItem('token');

if (token) {
    HOME_PAGE = '/';
    LOGIN = '/login';
} else {
    HOME_PAGE = '/home';
    LOGIN = '/';
}

export { HOME_PAGE, LOGIN };
