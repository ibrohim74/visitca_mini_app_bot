import React from 'react';
import {BACK_HOME} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import style from './stat.module.css'

const StatPage = () => {
    const currentDate = new Date();
    const monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const currentMonthName = monthNames[currentDate.getMonth()];

    return (
        <div className={'container'}>
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
        </div>
    );
};

export default StatPage;
