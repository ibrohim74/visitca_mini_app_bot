import {useTelegram} from "../hooks/useTelegram";

let HOME_PAGE;
let LOGIN;
const {tg} = useTelegram()

const token = tg.CloudStorage.getItem('token');
if (token) {
    HOME_PAGE = '/';
    LOGIN = '/login';
} else {
    HOME_PAGE = '/home';
    LOGIN = '/';
}

export { HOME_PAGE, LOGIN };
