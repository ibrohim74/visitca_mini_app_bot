import React from 'react';
import {BACK_HOME, BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import {Link, useParams} from "react-router-dom";
import style from './requests.module.css'
import {Icon} from "../../component/icons/icon";
import Score from "../../component/score/score";

const RequestsPage = () => {


    return (
        <div className={`container`}>
            <HeaderPage url={BACK_HOME} title={'Заявки'}/>
            <div className={style.requests_list}>
                <div  className={style.sellerDashboard__new_request_item}>
                    <div className={style.sellerDashboard__new_request_item_column_1}>
                        <div className={style.sellerDashboard__new_request_item_column_photo}>
                            <Icon.ImgPlaceholder
                            width={"100%"}
                            height={"100%"}
                        />
                        </div>
                        <div
                            className={style.sellerDashboard__new_request_item_column_title}>
                            <h1>Luex Dacha Premium</h1>
                            <div className={style.sellerDashboard__new_request_item_column_rating}>

                                <p>sadasdasd </p>
                                <Score score={3}/>

                            </div>

                        </div>

                    </div>

                    <div className={style.sellerDashboard__new_request_item_column_2}>
                        <div className={style.sellerDashboard__new_request_item_column_2_day}>
                            <p><Icon.Month/>Mon 05/12</p>
                            <p><Icon.Month/>Mon 05/12</p>
                        </div>

                    </div>

                    <div className={style.sellerDashboard__new_request_item_column_price}>
                        <h1>Цена:</h1>
                        <h1>200.000 Сум</h1>
                    </div>

                    <div className={style.sellerDashboard__new_request_item_column_3}>
                        <div className={style.sellerDashboard__new_request_item_column_3_buttons}>
                            <button >Принять</button>
                            <button >Отказать</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RequestsPage;