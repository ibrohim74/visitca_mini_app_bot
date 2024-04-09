import React from 'react';
import BackButton from "../../component/back_button/backButton";
import {BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";

const RequestsPage = () => {
    return (
        <div>
            <BackButton url={BOOKINGS_PAGE}/>
            request
        </div>
    );
};

export default RequestsPage;