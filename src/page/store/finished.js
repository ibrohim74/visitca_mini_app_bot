import React, {useEffect, useState} from 'react';
import style from '../bookings_user/booking_user.module.css';
import Header from '../../component/header/header';
import HeaderPage from '../../component/header_page/headerPage';
import {BACK_HOME} from '../../utils/consts';
import {Icon} from '../../component/icons/icon';
import {GetUserBookingAPI} from '../bookings_user/API/bookingUserAPI';
import {GetAnnouncementById} from '../bookings_page/API/bookingAPI';
import Footer from "../../component/footer/footer";

const Finished = () => {
    const [booking, setBooking] = useState([]);
    const [announcement, setAnnouncement] = useState([]);
    const [announcementID, setAnnouncementID] = useState([]);
    const [loading, setLoading] = useState(false)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
        };
        const formattedDate = date.toLocaleDateString('ru-RU', options).replace('.', '/');
        return formattedDate;
    };

    useEffect(() => {
        const fetchBookingData = async () => {
            setLoading(true)
            try {
                const bookingResponse = await GetUserBookingAPI();
                if (bookingResponse.status === 200) {
                    setBooking(bookingResponse.data);
                    const annIds = bookingResponse.data.map(({accommodation_id}) => accommodation_id);
                    setAnnouncementID(annIds);
                    setLoading(false)
                }
            } catch (e) {
                console.log(e)
            }

        };

        fetchBookingData();
    }, []);

    useEffect(() => {
        const fetchAnnouncement = async () => {
            const announcements = await Promise.all(announcementID.map(async (id) => {
                const response = await GetAnnouncementById(id);
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            }));
            setAnnouncement(announcements.filter(announcement => announcement !== null));
        };

        fetchAnnouncement();
    }, [announcementID]);

    return (

            <div className={style.bookingUser_booking_list}>

                {booking.length > 0 ? booking.map((item, index) => {
                        const matchingDachas = announcement.filter(dachaItem => item?.accommodation_id === dachaItem.id);
                        if (matchingDachas) {
                            if (item?.status === 'finished' || item.status === 'pre-finished'){
                                return (
                                    <div key={index} className={style.bookingUser_booking_item}>
                                        <div className={style.bookingUser_booking_item_col1}>
                                            <h1
                                                style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >{announcement[index]?.title}</h1>
                                            <div className={style.bookingUser_booking_item_status}>
                                                <span></span>
                                                {item?.status === 'finished' || item.status === 'pre-finished' && <p>Завершён</p>}
                                            </div>
                                        </div>
                                        <div className={style.bookingUser_booking_item_col2}>
                                            <div className={style.sellerDashboard__new_request_item_column_2_day}>
                                                <p><Icon.Month/>{formatDate(item.start_day)}</p>
                                                <p><Icon.Month/>{formatDate(item.end_day)}</p>
                                            </div>
                                        </div>
                                        <div className={style.bookingUser_booking_item_col3}>
                                            <div className={style.bookingUser_booking_item_col3_i2}>
                                                <h1>Цена :</h1>
                                                <h1>{item.final_price} {announcement[index]?.price_type}</h1>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }) :
                    <div className={'SellerDashboardNoData'}>
                        <Icon.NoDocuments/>
                        <p>На данный момент ничего нету</p>
                    </div>
                }
            </div>

    );
};

export default Finished;
