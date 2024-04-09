import React from 'react';
import {BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";

const RequestsPage = () => {
    return (
        <div>
            <HeaderPage url={HOME_PAGE} title={'Заявки'}/>
            request
        </div>
    );
};

export default RequestsPage;