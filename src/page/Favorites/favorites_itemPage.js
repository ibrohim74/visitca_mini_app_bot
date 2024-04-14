import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GetAnnouncementById} from "../bookings_page/API/bookingAPI";
import {Button, DatePicker, Input, Modal, Space} from "antd";
import {GetBookingByAnnId} from "./API/favoriteAPI";
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_BOOKING, BACK_FAVORITES} from "../../utils/consts";
import style from './favorites.module.css'
import Calendar from "../../component/calendar/calendar";
import Footer from "../../component/footer/footer";
import dayjs from "dayjs";

const FavoritesItemPage = () => {
    const [dacha, setDacha] = useState({})
    const [bookings, setBookings] = useState([])
    const [events, setEvents] = useState([])
    const [initialState, setInitialState] = useState({
        requested_price: 0
    })
    const [errorNotification, setErrorNotification] = useState([])
    const {id} = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {RangePicker} = DatePicker;


    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const disabledDate = (current) => {
        if (!current) return false;

        const today = dayjs();

        if (current.isBefore(today, "day") || current.isSame(today, "day")) {
            return true;
        }

        if (bookings.length > 0) {
            if (
                bookings.some(
                    (booking) =>
                        current >= dayjs(booking.start_day) &&
                        current <= dayjs(booking.end_day)
                )
            ) {
                return true;
            }
        }

        // Start day ni olib, boshlang'ich sanadan oldin kelgan kunlarni disbl qilamiz
        if (initialState.start_day && current.isBefore(dayjs(initialState.start_day), "day")) {
            return true;
        }

        return false;
    };


    const onChange = (value, dateString) => {
        const minimumBookDays = dacha?.minimum_book_days;
        try {
            const selectedDates = dateString.map((date) => dayjs(date));
            if (selectedDates.some((date) => !date.isValid())) {
                new Error("Noto‘g‘ri sana formati");
            }
            const differenceInDays = selectedDates[1].diff(selectedDates[0], "day");
            if (differenceInDays < minimumBookDays) {
                setInitialState({...initialState, start_day: "", end_day: ""});
                setErrorNotification(
                    `* XATO: Eng kam sana bron qilish uchun ${dacha?.minimum_book_days} kun bo'lishi kerak.`
                );
            } else {
                setErrorNotification("");
                const start_day = selectedDates[0].format("YYYY-MM-DDTHH:mm:ss");
                const end_day = selectedDates[1].format("YYYY-MM-DDTHH:mm:ss");
                setInitialState({...initialState, start_day, end_day});
            }
        } catch (error) {
            console.error("Sana qayta ishlashda xato:", error);
            setErrorNotification("* XATO: Noto‘g‘ri sana formati yoki vaqt.");
            setInitialState({...initialState, start_day: "", end_day: ""});
        }
    };
    useEffect(() => {
        GetAnnouncementById(id).then(r => {
            if (r.status === 200) {
                setDacha(r.data);
            }
        });
        GetBookingByAnnId(id).then(r => {
            if (r.status === 200) {
                setBookings(r.data)
                setEvents(r.data)
            }
        })
    }, [id])
    console.log(initialState)

    return (
        <div className={'container'}>
            <Header/>
            <HeaderPage url={BACK_FAVORITES} title={dacha?.title}/>
            <div className={style.favorite_itemPage_title_box}>
                <div className={style.favorite_itemPage_title}>
                    <div className={style.favorite_itemPage_title_left}>
                        <h1>{dacha?.title}</h1>
                        <p>{dacha?.location_name}</p>
                    </div>
                    <div className={style.favorite_itemPage_title_right}>
                        <h1>{dacha?.price} {dacha?.price_type}</h1>
                    </div>
                </div>
            </div>
            <div className={style.favorite_itemPage_header_title}>
                <p>Свободные дни:</p>
            </div>

            <div className={style.calendar}>
                <Calendar dachaId={id}
                          setEvents={setEvents}
                          events={events}
                />
            </div>
            <div className={style.favorite_itemPage_button} onClick={() => setIsModalOpen(true)}>
                Бронировать
            </div>
            <Modal title="Бронировать" open={isModalOpen} onCancel={handleCancel}
                   style={{
                       display: "flex",
                       justifyContent: 'center',
                       alignItems: 'center'
                   }}
            >
                <div className={style.favorite_itemPage_input}>
                    <p>время заселения</p>
                    <RangePicker
                        showTime={{
                            format: 'HH:mm',
                        }}
                        onChange={onChange}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        inputReadOnly={true} // Bu qatorni qo'llab-quvvatlash
                        keyboard={false} // Bu klaviyatura chiqmasin
                    />
                </div>

                <div className={style.favorite_itemPage_input}>
                    <p>сумма, которую вы хотите предложить</p>
                    <Input value={initialState?.requested_price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}

                           onChange={(e) => {
                               const cleanedValue = e.target.value.replace(/\s/g, "");
                               setInitialState({
                                   ...initialState,
                                   requested_price: cleanedValue !== "" ? parseInt(cleanedValue) : 0,
                               });
                           }}
                           onBlur={() => {
                               if (!initialState.requested_price || isNaN(initialState.requested_price)) {
                                   setInitialState({
                                       ...initialState,
                                       requested_price: 0,
                                   });
                               }
                           }}/>
                </div>
                <div className={style.favorite_itemPage_input}>
                    <p>количество взрослых</p>
                    <Input type={'number'} onChange={e=>setInitialState({...initialState , adults:parseInt(e.target.value)})}/>
                </div>
                <div className={style.favorite_itemPage_input}>
                    <p>количество дитей</p>
                    <Input type={'number'} onChange={e=>setInitialState({...initialState , children:parseInt(e.target.value)})}/>
                </div>
                <div className={style.favorite_itemPage_input}>
                    <p>Контактная информация</p>
                    <Input   type="text"
                             placeholder={"Введите номер телефона" }
                             value={initialState?.contacts}
                             onChange={e => {
                                 const formattedValue = e.target.value.replace(/\D/g, ''); // faqat raqamlarni qabul qilish
                                 let formattedNumber = '+998';
                                 if (formattedValue.length > 3) {
                                     formattedNumber += ' ' + formattedValue.substring(3, 5);
                                 }
                                 if (formattedValue.length > 5) {
                                     formattedNumber += ' ' + formattedValue.substring(5, 8);
                                 }
                                 if (formattedValue.length > 8) {
                                     formattedNumber += ' ' + formattedValue.substring(8, 10);
                                 }
                                 if (formattedValue.length > 10) {
                                     formattedNumber += ' ' + formattedValue.substring(10, 12);
                                 }
                                 setInitialState({...initialState, contacts: formattedNumber});
                             }}/>
                </div>

                <div className={style.favorite_itemPage_button} style={{margin:'20px 0 0 0'}}>
                    Бронировать
                </div>
            </Modal>
            <Footer/>
        </div>
    );
};

export default FavoritesItemPage;