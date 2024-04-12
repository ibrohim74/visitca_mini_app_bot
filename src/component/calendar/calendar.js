import React, { useEffect, useState, useRef } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { jwtDecode } from "jwt-decode";
import { $authHost } from "../../utils/http/http";
import { Icon } from "../icons/icon";

const Calendar = ({ dachaId, setEvents }) => {
    const [formattedEvents, setFormattedEvents] = useState([]);
    const [dataEvents,  setDataEvents] = useState([]);
    const JWT = jwtDecode(new URLSearchParams(window.location.search).get('token'));
    const calendarRef = useRef(null);

    const getCalendarEvents = async () => {
        try {
            const res = await $authHost.get(`/seller/${JWT.userId}/bookings`);
            const filterRes = res?.data.filter(e => e.accommodation_id === parseInt(dachaId));
            setDataEvents(filterRes);
            setEvents(filterRes);
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

    useEffect(() => {
        fetchData();
    }, [dataEvents]);

    useEffect(() => {
        getCalendarEvents();
    }, [dachaId]);

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
