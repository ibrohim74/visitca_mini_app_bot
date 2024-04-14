import React from 'react';
import style from './favorites.module.css'
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME} from "../../utils/consts";
const Favorites = () => {
    return (
        <div className={'container'}>
            <Header />
            <HeaderPage url={BACK_HOME} title={'FAVORITE'} />

            FAVORITES
        </div>
    );
};

export default Favorites;