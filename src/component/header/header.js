import React from 'react';
import style from './header.module.css'
import {Icon} from "../icons/icon";

const Header = () => {
    return (
        <div className={style.headerBox}>
            <Icon.Logo/>
        </div>
    );
};

export default Header;