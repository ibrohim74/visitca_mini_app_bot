import React, {useEffect, useState} from 'react';
import style from './favorites.module.css'
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME, BOOKINGS_ITEM_PAGE, FAVORITES_ITEM_PAGE} from "../../utils/consts";
import {Icon} from "../../component/icons/icon";
import Score from "../../component/score/score";
import {DeleteFavoriteAPI, GetFavoriteAPI} from "./API/favoriteAPI";
import {GetAnnouncementById} from "../bookings_page/API/bookingAPI";
import {Link, useNavigate, useParams} from "react-router-dom";


const Favorites = () => {
    const [favoriteList, setFavoriteList] = useState([]);
    const [announcementID, setAnnouncementID] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');


    const DeleteFavorite = async (id) => {
        const deleted = await DeleteFavoriteAPI(id);
        if (deleted?.status === 200) {
            const updatedFavorites = favoriteList.filter(item => item.id !== id);
            setFavoriteList(updatedFavorites);
        }
    };

    const navigateItemPage = (page) => {
        const path = FAVORITES_ITEM_PAGE.replace(":id", page) + `?token=${token}`;
        navigate(path);
    }

    useEffect(() => {
        const fetchFavoriteAndAnnouncements = async () => {
            setLoading(true);
            const response = await GetFavoriteAPI();
            if (response?.status === 200) {
                setFavoriteList(response.data);
                const annIds = response.data.map(({ accommodation_id }) => accommodation_id);
                setAnnouncementID(annIds);
            }
            setLoading(false);
        };

        fetchFavoriteAndAnnouncements();
    }, []);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            if (announcementID.length > 0) {
                setLoading(true);
                const announcements = await Promise.all(announcementID.map(async (id) => {
                    const response = await GetAnnouncementById(id);
                    if (response.status === 200) {
                        return response.data;
                    }
                    return null;
                }));
                setAnnouncement(announcements.filter(announcement => announcement !== null));
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [announcementID]);


    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'Избранные'}/>
            {loading && <div>Loading ...</div>}
            <div className={style.favorite_list}>
                {!loading && favoriteList?.length > 0 ? favoriteList.map((item, index) => {
                    const matchingDachas = announcement.find(dachaItem => item?.accommodation_id === dachaItem.id);
                    if (matchingDachas) {
                        return (
                            <div className={style.favorite_item} key={index}>
                                <div className={style.favorite_item_left} onClick={() => navigateItemPage(item?.accommodation_id)}>
                                    <h1>{matchingDachas?.title}</h1>
                                    <p>{matchingDachas?.location_name}</p>
                                    <h2>{matchingDachas?.price} {matchingDachas?.price_type}</h2>
                                </div>
                                <div className={style.favorite_item_right}>
                                    <div className={style.favorite_item_button} onClick={() => DeleteFavorite(item.id)}>
                                        <Icon.Star/>
                                    </div>
                                    <div className={style.favorite_item_stat}>
                                        <h1>{matchingDachas?.rating}</h1>
                                        <p>{matchingDachas?.reviews_number} отзывов</p>
                                    </div>
                                    <div className={style.favorite_item_rating}>
                                        <Score score={matchingDachas?.rating}/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    return null;
                }) : (
                    <div className={'SellerDashboardNoData'}>
                        <Icon.NoDocuments/>
                        <p>На данный момент ничего нету</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
