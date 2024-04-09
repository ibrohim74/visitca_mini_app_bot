import React from 'react';
import {BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import {Link} from "react-router-dom";

const RequestsPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const currentUrl = window.location.href;

    return (
        <div>
            {urlParams}
            <HeaderPage url={HOME_PAGE} title={'Заявки'}/>
            request <br/>
            <Link to={HOME_PAGE}>gjjgkgkhgjhg</Link>

        </div>
    );
};

export default RequestsPage;