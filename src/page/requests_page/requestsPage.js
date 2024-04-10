import React from 'react';
import {BACK_HOME, BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import {Link, useParams} from "react-router-dom";
import style from './requests.module.css'
const RequestsPage = () => {


    return (
        <div className={`container`}>
            <HeaderPage url={BACK_HOME} title={'Заявки'}/>
            <div className={style.requests_list}>
                <div className={style.request_list__item}>

                </div>
            </div>
        </div>
    );
};

export default RequestsPage;