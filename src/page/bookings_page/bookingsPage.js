import React, { useEffect, useState } from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import { BACK_HOME, BOOKINGS_ITEM_PAGE } from "../../utils/consts";
import style from './bookings.module.css'
import Score from "../../component/score/score";
import { useNavigate } from "react-router-dom";
import { GetAnnouncementAPI } from "../requests_page/API/RequestsAPI";
import { Icon } from "../../component/icons/icon";
import { GetBookingsBySellerID, GetReviewAPI } from "./API/bookingAPI";
import {PriceFormat} from "../../hooks/formatAmount";

const BookingsPage = () => {
    const [dacha, setDacha] = useState([]);
    const [review, setReview] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const navigateItemPage = (page) => {
        const path = BOOKINGS_ITEM_PAGE.replace(":id", page) + `?token=${token}`;
        navigate(path);
    }

    const getReview = async () => {
        await Promise.all(dacha.map(async (item, index) => {
            try {
                const r = await GetReviewAPI(item);
                if (r?.status === 200) {
                    const newReview = [...review];
                    newReview[index] = r.data;
                    setReview(newReview);
                }
            } catch (error) {
                console.error("Error fetching review:", error);
            }
        }));
    };

    const getData = async () => {
        setLoading(true);
        try {
            const dachaResponse = await GetAnnouncementAPI();
            if (dachaResponse.status === 200) {
                setDacha(dachaResponse.data);
            }

            const bookingsResponse = await GetBookingsBySellerID();
            if (bookingsResponse.status === 200) {
                setBookings(bookingsResponse.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReview();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Header />
            <HeaderPage url={BACK_HOME} title={'Бронированые'} />

            <div className={style.bookings_list}>
                {loading ? "Loading ..." : (
                    dacha?.length > 0 ? (
                        <>
                            {dacha.map((item, index) => {
                                const filterBooking = bookings.find(e => e?.accommodation_id === item.id)
                                if (filterBooking) {
                                    return (
                                        <div key={index} className={style.bookings_list_item} onClick={() => navigateItemPage(item?.id)}>
                                            <div className={style.bookings_list_item_title}>
                                                <h1 style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: 'nowrap'
                                                }}>{item.title}</h1>
                                            </div>
                                            <div className={style.bookings_list_item_info}>
                                                <div className={style.bookings_list_item_info_location}>
                                                    <p
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >{item.location_name}</p>
                                                </div>
                                                <div className={style.bookings_list_item_info_requests}>
                                                    <h1>{item.rating}</h1>
                                                    <p>{review.length} отзывов</p>
                                                </div>
                                            </div>
                                            <div className={style.bookings_list_item_footer}>
                                                <h1>{PriceFormat(item.price)} {item.price_type}</h1>
                                                <Score score={item.rating} />
                                            </div>
                                        </div>
                                    )
                                } else {
                                    // Agar filterBooking topilmasa, uni dacha stavkasidan olib tashlaymiz
                                    setDacha(prevDacha => prevDacha.filter(e => e.id !== item.id))
                                    // Keyingi tartibda stavkani render qilmaymiz
                                    return null;
                                }
                            })}
                        </>
                    ) : (
                        <div className={style.SellerDashboardNoData}>
                            <Icon.NoDocuments />
                            <p>На данный момент ничего нету</p>
                        </div>
                    )
                )}
            </div>

        </div>
    );
};

export default BookingsPage;
