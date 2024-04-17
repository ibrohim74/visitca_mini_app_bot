import React, {useState} from 'react';
import style from './store.module.css'
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME} from "../../utils/consts";
import Finished from "./finished";
import Canceled from "./canceled";

const Store = () => {
    const [activeTab, setActiveTab] = useState(false)
    return (
        <div className={'container'} style={{display:"flex", justifyContent:"center" , alignItems:'center' , flexDirection:"column"}}>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'История'} h1Style={{padding: "0 90px"}}/>

            <div className={style.store_tab}>
                <div className={style.store_tab_1} onClick={() => setActiveTab(false)}
                     style={activeTab ? {background: "transparent"} : {background: '#fff'}}
                >Завершённые
                </div>
                <div className={style.store_tab_2} onClick={() => setActiveTab(true)}
                     style={activeTab ? {background: "#fff"} : {background: 'transparent'}}>
                    Откланёные
                </div>
            </div>

            <div className={style.store_content}>
                {!activeTab && <Finished/>}
                {activeTab && <Canceled/>}
            </div>
        </div>
    );
};

export default Store;