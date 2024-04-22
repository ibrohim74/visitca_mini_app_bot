import React, {useEffect, useState, useRef} from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import {jwtDecode} from "jwt-decode";
import {$authHost} from "../../utils/http/http";
import {Icon} from "../icons/icon";
import isEqual from 'lodash/isEqual';
import style from './calendar.module.css'
import {Modal} from "antd";

const Calendar = ({dachaId, setEvents, events}) => {
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [dataEvents, setDataEvents] = useState([]);
    const JWT = jwtDecode(new URLSearchParams(window.location.search).get('token'));
    const calendarRef = useRef(null);
    const urlParams = new URLSearchParams(window.location.search);
    const token = jwtDecode(urlParams.get('token'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({}); // Saqlanayotgan tanlangan event ma'lumotlarini saqlash uchun


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getCalendarEvents = async () => {
        try {
            const res = await $authHost.get(`/dacha/${dachaId}/bookings`);
            const filterRes = res?.data.filter(e => e.accommodation_id === parseInt(dachaId));
            setDataEvents(filterRes);
            setEvents(filterRes);
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        // Cleanup function to destroy FullCalendar instance when component unmounts
        return () => {
            if (calendarRef.current) {
                calendarRef.current.getApi().destroy();
            }
        };
    }, []);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event.id);
        console.log(info.event)
        setIsModalOpen(true);
    };

    const handleDelete = async (idBooking) => {
        try {
            const res = await $authHost.delete(`/booking/${idBooking}`)
            console.log(res)
            setIsModalOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDateClick = (selected) => {
        console.log("Selected Date:", selected.dateStr);
        const title = window.prompt("Please enter a new title for your event");
        console.log("Event Title:", title);
        const calendarApi = calendarRef.current.getApi(); // Get FullCalendar API reference from useRef
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                title,
                start: selected.date,
                allDay: true, // Assuming all-day event
            });
        }
    };

    useEffect(() => {
        setDataEvents(events);
    }, [events?.length]);

    useEffect(() => {
        const formattedData = dataEvents?.map(event => ({
            key: event.id,
            id: event.id,
            start: new Date(event.start_day),
            end: new Date(event.end_day),
            backgroundColor: 'lightgreen',
        }));
        setFormattedEvents(formattedData);
    }, [dataEvents]);

    useEffect(() => {
        getCalendarEvents();
    }, [dachaId]);
    console.log(selectedEvent)
    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                locale={'ru'}
                dayMaxEvents={false}
                weekends={true}
                select={handleDateClick}
                events={formattedEvents}
                eventClick={token?.role === 'seller' && handleEventClick}

            />

            <Modal  visible={isModalOpen} onCancel={handleCancel} className={style.calendar_modal}>
                <div className={style.calendar_modal_icon}><Icon.Deleted/></div>
                <div className={style.calendar_modal_textContent}>
                    <h1>Удалить бронь</h1>
                    <p>
                        Вы действительно хотите
                        удалить текущий бронь
                    </p>
                </div>
                <div className={style.calendar_modal_btns}>
                    <button onClick={() => setIsModalOpen(false)}>Отмена</button>
                    <button onClick={() => handleDelete(selectedEvent)}>Удалить</button>

                </div>
            </Modal>
        </>
    );
};

export default Calendar;
