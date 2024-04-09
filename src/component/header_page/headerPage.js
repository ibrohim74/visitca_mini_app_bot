import React from 'react';
import {HOME_PAGE} from "../../utils/consts";
import style from './headerPage.module.css'
import {Icon} from "../icons/icon";
import {Link} from "react-router-dom";
const HeaderPage = (props) => {
    return (
        <div className={style.headerPage_box}>
            <Link to={props.url ? props.url : HOME_PAGE} className={style.backButton}>
                <Icon.ArrowLeft/>
            </Link>
            <div className={style.headerPage_title}></div>
            <h1>{props?.title}</h1>
        </div>
    );
};

export default HeaderPage;