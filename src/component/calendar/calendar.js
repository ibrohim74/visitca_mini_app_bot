import React, { useEffect, useState, useRef } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../utils/http/http";
import { Icon } from "../icons/icon";

const Calendar = (props) => {
    const [dataEvents, setDataEvents] = useState([]);
    const [formattedEvents, setFormattedEvents] = useState([]);
    const JWT = jwtDecode(new URLSearchParams(window.location.search).get('token'));
    const calendarRef = useRef(null);

    const getCalendarEvents = async () => {
        try {
            const res = await $authHost.get(`/seller/${JWT.userId}/bookings`);
            const filterRes = res?.data.filter(e => e.accommodation_id === parseInt(props.dachaId));
            setDataEvents(filterRes);
            props.setEvents(filterRes);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        const formattedData = await Promise.all(dataEvents?.map(async (event) => {
            return {
                id: event?.id,
                start: new Date(event?.start_day),
                end: new Date(event?.end_day),
                backgroundColor: 'lightgreen',
            };
        }));
        setFormattedEvents(formattedData);
    };

    const handlePrevClick = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
    };

    const handleNextClick = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
    };

    useEffect(() => {
        fetchData();
        getCalendarEvents();
    }, [dataEvents]);

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
            }}
            initialView="dayGridMonth"
            editable={false}
            selectable={false}
            selectMirror={false}
            locale={'ru'}
            dayMaxEvents={true}
            weekends={true}
            events={formattedEvents}
        />
    );
};

export default Calendar;
