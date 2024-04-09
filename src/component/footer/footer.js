import React from 'react';
import style from './footer.module.css'
import {Icon} from "../icons/icon";

const Footer = () => {
    return (
        <div className={`container ${style.footer}`} style={{display:'flex' , justifyContent:"center" , alignItems:'flex-end'
        }}>
            <p><Icon.Question/> Справка и поддержа</p>
        </div>
    );
};

export default Footer;