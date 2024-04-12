import React, {useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../component/header/header";
import style from './homePage.module.css'
import {GetCurrentUser} from "./API/homePageAPI";
import {Icon} from "../../component/icons/icon";
import Footer from "../../component/footer/footer";
import {Link, useParams} from "react-router-dom";
import {BOOKINGS_PAGE, REQUESTS_PAGE, STAT_PAGE} from "../../utils/consts";

const HomePage = () => {
    const [user, setUser] = useState()
    useEffect(() => {
        GetCurrentUser().then(r => {
            if (r.status === 200) {
                setUser(r.data)
            }
        })
    }, [])
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return (
        <div className={'container'} style={{
            display: 'flex', justifyContent: "center", alignItems: 'center',
            flexDirection: "column"
        }}>
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

                {user?.phone_number && <div className={style.section_profile__tel}>
                    <p>{user?.phone_number}</p>
                </div>}
            </div>

            <div className={style.section_homePage_buttons}>
                <Link to={REQUESTS_PAGE + `?token=${token}`} className={style.section_homePage_buttons_item}>
                    Заявки
                </Link>
                <Link to={BOOKINGS_PAGE + `?token=${token}`} className={style.section_homePage_buttons_item}>
                    Бронированые
                </Link>
                <Link to={STAT_PAGE + `?token=${token}`} className={style.section_homePage_buttons_item}>
                    Статистика
                </Link>
            </div>

            <Footer/>
        </div>
    );
};

export default HomePage;