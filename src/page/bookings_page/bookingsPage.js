import React from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME, BOOKINGS_ITEM_PAGE} from "../../utils/consts";
import style from './bookings.module.css'
import Score from "../../component/score/score";
import {useNavigate} from "react-router-dom";

const BookingsPage = () => {
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const navigateItemPage = (page) => {
        const path = BOOKINGS_ITEM_PAGE.replace(":id", page)+`?token=${token}`;
        navigate(path);
    }


    return (
        <div>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'Бронированые'}/>

            <div className={style.bookings_list}>
                <div className={style.bookings_list_item} onClick={()=>navigateItemPage(1)}>
                    <div className={style.bookings_list_item_title}>
                        <h1>Hilton Plaza 777</h1>
                    </div>
                    <div className={style.bookings_list_item_info}>
                        <div className={style.bookings_list_item_info_location}>
                            <p>Самаркандская область, Самарканд</p>
                        </div>
                        <div className={style.bookings_list_item_info_requests}>
                            <h1>4.5</h1>
                            <p>2032 отзывов</p>
                        </div>
                    </div>
                    <div className={style.bookings_list_item_footer}>
                        <h1>200.000 Сум</h1>
                        <Score score={2}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;