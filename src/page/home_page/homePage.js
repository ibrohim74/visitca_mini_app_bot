import React, {useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../component/header/header";
import style from './homePage.module.css'
import {GetCurrentUser} from "./API/homePageAPI";
import {Icon} from "../../component/icons/icon";

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
        <div className={style.container}>
            <Header/>

            <div className={style.section_profile}>
                <div className={style.section_profile__photo}>
                    {user?.image_path ?
                        <img src={`https://visitca.travel/api${user?.image_path}`} alt={user?.image_path}/>
                        :
                        <Icon.UserDefolt/>
                    }
                </div>
                <div className={style.section_profile__name}>
                    <h1>{user?.username}</h1>
                </div>

                {user?.phone_number &&  <div className={style.section_profile__tel}>
                    <p>{user?.phone_number}</p>
                </div>}

            </div>
        </div>
    );
};

export default HomePage;