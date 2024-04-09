import React from 'react';
import {Link} from "react-router-dom";
import {HOME_PAGE} from "../../utils/consts";
import {Icon} from "../icons/icon";
import style from "./backButton.module.css"
const BackButton = (props) => {
    return (
        <Link to={props.url ? props.url : HOME_PAGE} className={style.backButton}>
            <Icon.ArrowLeft/>
        </Link>
    );
};

export default BackButton;