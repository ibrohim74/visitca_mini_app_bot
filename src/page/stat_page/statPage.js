import React from 'react';
import {BACK_HOME} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import style from './stat.module.css'
import Header from "../../component/header/header";

const StatPage = () => {
    const currentDate = new Date();
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const currentMonthName = monthNames[currentDate.getMonth()];

    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'Статистика'}/>
            <div className={style.stat_month}>
                <select defaultValue={currentMonthName}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.stat_list}>
                <div className={style.stat_list_item}>
                    <p>Заработанно:</p>
                    <p>1 200 000 Сум</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Всего заявок:</p>
                    <p>23</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Успешные сделки:</p>
                    <p>43</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Отменённых бронирований:</p>
                    <p>12</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Преждевременных выселений:</p>
                    <p>2</p>
                </div>
            </div>
        </div>
    );
};

export default StatPage;
