import React from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_BOOKING} from "../../utils/consts";

const BookingItemPage = () => {
    return (
        <div>
            <Header/>
            <HeaderPage url={BACK_BOOKING} title={'asdsada'}/>
        </div>
    );
};

export default BookingItemPage;