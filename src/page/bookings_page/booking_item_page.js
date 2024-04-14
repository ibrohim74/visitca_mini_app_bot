import React, {useEffect, useState} from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_BOOKING} from "../../utils/consts";
import {useParams} from "react-router-dom";
import {GetAnnouncementById, GetBookingsByAccId} from "./API/bookingAPI";
import style from './bookings.module.css';
import 'react-calendar/dist/Calendar.css';
import {Icon} from "../../component/icons/icon";
import Calendar from "../../component/calendar/calendar";
import {$authHost} from "../../utils/http/http";
import Footer from "../../component/footer/footer";
import {PriceFormat} from "../../hooks/formatAmount";

const BookingItemPage = () => {
    const [dacha, setDacha] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [clients, setClients] = useState([]);
    const {id} = useParams();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("ru-RU", options).replace('.', '/');
        return formattedDate;
    };


    useEffect(() => {
        // Dachayı bul
        GetAnnouncementById(id).then(r => {
            if (r.status === 200) {
                setDacha(r.data);
            }
        });

        // Rezervasyonları bul
        GetBookingsByAccId(id).then(r => {
            if (r.status === 200) {
                setBookings(r.data);
            }
        });
    }, []);

    useEffect(() => {
        // Rezervasyonları temizle ve müşterileri al
        const getClientBooking = async () => {
            const clientsArray = [];
            for (const item of bookings) {
                try {
                    const res = await $authHost.get('user/' + item.customer_id);
                    clientsArray.push(res.data);
                } catch (error) {
                    console.error('Error fetching client booking:', error);
                }
            }
            setClients(clientsArray);
        };

        getClientBooking();
    }, [bookings]);
    console.log(bookings)
    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_BOOKING} title={dacha?.title}/>

            <div className={style.booking_itemPage_title}>
                <p>Бронированые дни :</p>
            </div>
            <div className={style.booking_itemPage_calendarBox}>
                <Calendar
                    dachaId={id}
                    setEvents={() => {
                    }}
                />
            </div>

            <div className={style.booking_itemPage_title}>
                <p>Пользователи :</p>
            </div>

            <div className={style.booking_itemPage_clients}>
                {clients.map((client, index) => {
                    if (client.id === bookings[index].customer_id) {
                        return (
                            <div className={style.booking_itemPage_clients_item} key={index}>
                                <div className={style.booking_itemPage_clients_item_title}>
                                    <h1>{client.username}</h1>
                                </div>
                                <div className={style.booking_itemPage_clients_item_month}>
                                    <div className={style.sellerDashboard__new_request_item_column_2_day}>
                                        <p>
                                            <Icon.Month/>{formatDate(client.id === bookings[index].customer_id && bookings[index]?.start_day)}
                                        </p>
                                        <p>
                                            <Icon.Month/>{formatDate(client.id === bookings[index].customer_id && bookings[index]?.end_day)}
                                        </p>
                                    </div>
                                </div>

                                <div className={style.booking_itemPage_clients_item_price}>
                                    <h1>Цена :</h1>
                                    <h1>{client.id === bookings[index].customer_id && PriceFormat(bookings[index]?.final_price)} {dacha?.price_type}</h1>
                                </div>
                            </div>
                        )
                    }
                })}

            </div>
            <Footer/>
        </div>
    );
};

export default BookingItemPage;
