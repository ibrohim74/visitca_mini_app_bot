import React from 'react';
import {BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";

const RequestsPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return (
        <div>
            <HeaderPage url={HOME_PAGE} title={'Заявки'}/>
            request
            {urlParams} <br/>
            {token}
        </div>
    );
};

export default RequestsPage;