import React, {useEffect, useState} from 'react';
import {BACK_HOME, BOOKINGS_PAGE, HOME_PAGE} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import {Link, useParams} from "react-router-dom";
import style from './requests.module.css'
import {Icon} from "../../component/icons/icon";
import Score from "../../component/score/score";
import {$authHost} from "../../utils/http/http";
import {AcceptRequestAPI, DenyRequestAPI, GetAnnouncementAPI, GetRequestAPI} from "./API/RequestsAPI";

const RequestsPage = () => {

    const [requests, setRequests] = useState([]);
    const [dacha, setDacha] = useState([]);
    const [client, setClient] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: "short", // short dan "Wed" uchun
            day: "2-digit",
            month: "2-digit",
        };
        const formattedDate = date.toLocaleDateString("ru-RU", options).replace('.', '/');
        return formattedDate;
    };


    const acceptRequest = (id) => {
        AcceptRequestAPI(id).then((r) => {
            if (r?.status === 200) {
                window.location.reload();
            }
        });
    };

    const denyRequest = (id) => {
        DenyRequestAPI(id).then((r) => {
            if (r?.status === 200) {
                window.location.reload();
            }
        });
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const requestResponse = await GetRequestAPI();
            if (requestResponse?.data) {
                const awaitingRequests = requestResponse.data.filter(item => item.status === "awaiting");
                setRequests(awaitingRequests);
                console.log(requestResponse);
            }


            const announcementResponse = await GetAnnouncementAPI();
            if (announcementResponse?.data) {
                setDacha(announcementResponse.data);
                const images = announcementResponse.data.map((item) =>
                    item?.photos_path?.split("\n").filter(Boolean).map(url => url.trim())
                );
                setPhotoUrls(images);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const getClient = async () => {
        try {
            const clientData = [];
            for (const item of requests) {
                const res = await $authHost.get("user/" + item.customer_id);
                clientData.push(res.data);
            }
            setClient(clientData);
        } catch (error) {
            console.log("Error fetching client data:", error);
        }
    };

    useEffect(() => {
        getClient();
    }, [requests]);




    return (
        <div className={`container`}>
            <HeaderPage url={BACK_HOME} title={'Заявки'}/>
            <div className={style.requests_list}>
                {isLoading  ? 'loading' : 'finished'}
                {requests ?
                    requests.map((item) => {
                        console.log(item)
                        if (item.status === "awaiting"){
                            return (
                                <div  className={style.sellerDashboard__new_request_item}>
                                    <div className={style.sellerDashboard__new_request_item_column_1}>
                                        <div className={style.sellerDashboard__new_request_item_column_photo}>
                                            <Icon.ImgPlaceholder
                                                width={"100%"}
                                                height={"100%"}
                                            />
                                        </div>
                                        <div
                                            className={style.sellerDashboard__new_request_item_column_title}>
                                            <h1>Luex Dacha Premium</h1>
                                            <div className={style.sellerDashboard__new_request_item_column_rating}>

                                                <p>sadasdasd </p>
                                                <Score score={3}/>

                                            </div>

                                        </div>

                                    </div>

                                    <div className={style.sellerDashboard__new_request_item_column_2}>
                                        <div className={style.sellerDashboard__new_request_item_column_2_day}>
                                            <p><Icon.Month/>Mon 05/12</p>
                                            <p><Icon.Month/>Mon 05/12</p>
                                        </div>

                                    </div>

                                    <div className={style.sellerDashboard__new_request_item_column_price}>
                                        <h1>Цена:</h1>
                                        <h1>200.000 Сум</h1>
                                    </div>

                                    <div className={style.sellerDashboard__new_request_item_column_3}>
                                        <div className={style.sellerDashboard__new_request_item_column_3_buttons}>
                                            <button >Принять</button>
                                            <button >Отказать</button>
                                        </div>
                                    </div>

                                </div>
                            );
                        }
                    }) :  <div className={style.SellerDashboardNoData}>
                        <Icon.NoDocuments/>
                        <p>На данный момент ничего нету</p>
                    </div>}
            </div>
        </div>
    );
};

export default RequestsPage;