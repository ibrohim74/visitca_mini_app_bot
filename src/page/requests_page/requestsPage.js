import React from 'react';
import {BACK_HOME, BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import {Link, useParams} from "react-router-dom";

const RequestsPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const currentUrl = window.location.href;
const params= useParams()
    return (
        <div>
            {params}
            <HeaderPage url={BACK_HOME} title={'Заявки'}/>
            request <br/>
            <Link to={HOME_PAGE}>gjjgkgkhgjhg</Link>

        </div>
    );
};

export default RequestsPage;