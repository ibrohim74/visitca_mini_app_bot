import React, { useEffect, useState } from 'react';
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import { BACK_BOOKING } from "../../utils/consts";
import { useParams } from "react-router-dom";
import { GetAnnouncementById, GetBookingsByAccId } from "./API/bookingAPI";
import style from './bookings.module.css';
// import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Icon } from "../../component/icons/icon";
import Calendar from "../../component/calendar/calendar";

const BookingItemPage = () => {
    const [dacha, setDacha] = useState();
    const [bookings, setBookings] = useState([]);
    const [dat, setDat] = useState([]);
    const [events, setEvents] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        GetAnnouncementById(id).then(r => {
            if (r.status === 200) {
                setDacha(r.data);
            }
        });
        GetBookingsByAccId(id).then(r => {
            if (r.status === 200) {
                setBookings(r.data);
                const startDates = r.data.map(item => item.start_day);
                const endDates = r.data.map(item => item.end_day);
                // Merge startDates and endDates into a single array
                const allDates = [...startDates, ...endDates];
                setDat(allDates);
            }
        });
    }, []);

    return (
        <div className={'container'}>
            <Header />
            <HeaderPage url={BACK_BOOKING} title={dacha?.title} />

            <div className={style.booking_itemPage_title}>
                <p>Бронированые дни :</p>
            </div>
            <div className={style.booking_itemPage_calendarBox}>
                {/*<Calendar*/}
                {/*    value={dat}*/}
                {/*    className={style.itemPage_calendar}*/}
                {/*    nextLabel={<Icon.Next />}*/}
                {/*    prevLabel={<Icon.Prev />}*/}
                {/*    showDoubleView={false}*/}
                {/*    showFixedNumberOfWeeks={false}*/}
                {/*/>*/}
                <Calendar
                dachaId={id}
                setEvents={setEvents}
                />
            </div>
        </div>
    );
};

export default BookingItemPage;
