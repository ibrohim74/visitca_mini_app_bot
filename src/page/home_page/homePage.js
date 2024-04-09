import React, {useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../component/header/header";
import style from './homePage.module.css'
import {GetCurrentUser} from "./API/homePageAPI";
const HomePage = () => {
    const [user , setUser] = useState()

    useEffect(()=>{
        GetCurrentUser().then(r=>{
            if (r.status === 200){
                setUser(r.data)
            }
        })
    },[])

    return (
        <div className={'container'}>
            <Header/>

            <div className={style.section_profile}>
                {user?.username}
                {user?.role}
                {user?.id}
            </div>
        </div>
    );
};

export default HomePage;