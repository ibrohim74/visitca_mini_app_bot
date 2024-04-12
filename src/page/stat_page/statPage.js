import React, {useState, useEffect} from 'react';
import {BACK_HOME} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import style from './stat.module.css';
import Header from "../../component/header/header";
import {GetBookingsBySellerID} from "../bookings_page/API/bookingAPI";
import {GetAnnouncementAPI, GetRequestAPI} from "../requests_page/API/RequestsAPI";
import {PriceFormat} from "../../hooks/formatAmount";

const StatPage = () => {
    const [selectMonth, setSelectMonth] = useState();
    const [totalUZS, setTotalUZS] = useState(0);
    const [totalUSD, setTotalUSD] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [successfulDeals, setSuccessfulDeals] = useState(0);
    const [cancelledBookings, setCancelledBookings] = useState(0);
    const [earlyCheckouts, setEarlyCheckouts] = useState(0);

    const currentDate = new Date();
    const monthNames = [
        {number: '01', month: 'Январь'},
        {number: '02', month: 'Февраль'},
        {number: '03', month: 'Март'},
        {number: '04', month: 'Апрель'},
        {number: '05', month: 'Май'},
        {number: '06', month: 'Июнь'},
        {number: '07', month: 'Июль'},
        {number: '08', month: 'Август'},
        {number: '09', month: 'Сентябрь'},
        {number: '10', month: 'Октябрь'},
        {number: '11', month: 'Ноябрь'},
        {number: '12', month: 'Декабрь'}
    ];
    const currentMonthName = monthNames[currentDate.getMonth()];

    useEffect(() => {
        setSelectMonth(currentMonthName);
    }, []);

    useEffect(() => {
        getPrice();
    }, [selectMonth]);

    const getPrice = async () => {
        const monthNumber = selectMonth?.number;
        if (!monthNumber) return;

        const response = await GetBookingsBySellerID();
        const resAnnouncement = await GetAnnouncementAPI();
        const resRequest = await GetRequestAPI();
        const bookings = response?.data || [];
        const announcement = resAnnouncement?.data || [];
        const requests = resRequest?.data || [];
        console.log(requests)
        //filter
        const filteredBookings = bookings.filter(booking => {
            const orderDate = new Date(booking.order_date);
            return orderDate.getMonth() + 1 === parseInt(monthNumber);
        });
        const filterRequests = requests.filter(requests => {
            const orderDate = new Date(requests.date);
            return orderDate.getMonth() + 1 === parseInt(monthNumber);
        });

        const filteredBookingsFinished= bookings.filter(booking => {
            const orderDate = new Date(booking.order_date);
            return orderDate.getMonth() + 1 === parseInt(monthNumber) && booking.status === "finished";
        });
        // total price
        let totalUZSIncome = 0;
        let totalUSDIncome = 0;

        filteredBookingsFinished.forEach(booking => {
            const matchingAnnouncement = announcement.find(a => a.id === booking.accommodation_id);
            if (matchingAnnouncement && matchingAnnouncement.price_type === 'uzs') {
                totalUZSIncome += booking.final_price;
            } else if (matchingAnnouncement && matchingAnnouncement.price_type === 'usd') {
                totalUSDIncome += booking.final_price;
            }
        });

        setTotalUZS(totalUZSIncome);
        setTotalUSD(totalUSDIncome);

        // total bookings
        setTotalBookings(filteredBookings.length);

        // total requests
        setTotalRequests(filterRequests.length)

        // finished bookings
        const successfulDealsCount = filteredBookings.filter(booking => booking.status === "finished").length;
        setSuccessfulDeals(successfulDealsCount);

        // cancelled and deleted bookings
        const cancelledBookingsCount = filteredBookings.filter(booking => booking.status === "cancelled").length;
        const deletedBookingsCount = filteredBookings.filter(booking => booking.status === "deleted").length;
        setCancelledBookings(cancelledBookingsCount+deletedBookingsCount);

        // pre-finished bookings
        const earlyCheckoutsCount = filteredBookings.filter(booking => booking.status === "pre-finished").length;
        setEarlyCheckouts(earlyCheckoutsCount);
    };

    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_HOME} title={'Статистика'}/>
            <div className={style.stat_month}>
                <select value={selectMonth?.month} onChange={e => {
                    const filter = monthNames.find(m => m.month === e.target.value)
                    setSelectMonth(filter)
                }}>
                    {monthNames.map((month, index) => (
                        <option key={index} value={month.month}>
                            {month.month}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.stat_list}>
                <div className={style.stat_list_item}>
                    <p>Заработанно:</p>
                    <p>{PriceFormat(totalUZS)} Сум</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Заработанно:</p>
                    <p>{PriceFormat(totalUSD)} $</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>заказы:</p>
                    <p>{totalBookings}</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Всего заявок:</p>
                    <p>{totalRequests}</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Успешные сделки:</p>
                    <p>{successfulDeals}</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Отменённых бронирований:</p>
                    <p>{cancelledBookings}</p>
                </div>
                <div className={style.stat_list_item}>
                    <p>Преждевременных выселений:</p>
                    <p>{earlyCheckouts}</p>
                </div>
            </div>
        </div>
    );
};

export default StatPage;
