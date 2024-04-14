import React from 'react';
import style from './store.module.css'
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME} from "../../utils/consts";

const Store = () => {
    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'STORE'}/>
            store
        </div>
    );
};

export default Store;