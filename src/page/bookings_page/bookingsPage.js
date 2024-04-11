import React from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME} from "../../utils/consts";
import style from './bookings.module.css'
import Score from "../../component/score/score";
const BookingsPage = () => {
    return (
        <div>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'Бронированые'}/>

            <div className={style.bookings_list}>
                <div className={style.bookings_list_item}>
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