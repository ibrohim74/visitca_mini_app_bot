import React, {useEffect, useState} from 'react';
import {BACK_HOME} from "../../utils/consts";
import HeaderPage from "../../component/header_page/headerPage";
import style from './requests.module.css';
import {Icon} from "../../component/icons/icon";
import Score from "../../component/score/score";
import {AcceptRequestAPI, DenyRequestAPI, GetAnnouncementAPI, GetRequestAPI} from "./API/RequestsAPI";
import {$authHost} from "../../utils/http/http";
import {PriceFormat} from "../../hooks/formatAmount";

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [dacha, setDacha] = useState([]);
    const [client, setClient] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
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
            }
            const announcementResponse = await GetAnnouncementAPI();
            if (announcementResponse?.data) {
                setDacha(announcementResponse.data);
                const images = announcementResponse.data.map((item) =>
                    item?.photos_path?.split("\n").filter(Boolean).map(url => url.trim())
                );
                setPhotoUrls(images);
            }
        } catch (errors) {
            // setError(errors)
        } finally {
            setIsLoading(false);
        }
    };

    const getClient = async () => {
        try {
            const clientData = [];
            for (const item of requests) {
                const res = await $authHost.get("user/" + item?.customer_id);
                clientData.push(res.data);
            }
            setClient(clientData);
        } catch (error) {
            console.log("Error fetching client data:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        getClient();
    }, [requests]);

    console.log(requests)
    return (
        <div className={`container`}>
            <HeaderPage url={BACK_HOME} title={'Заявки'}/>
            <div className={style.requests_list}>
                {isLoading ? 'loading' : (
                    requests?.length > 0 ?
                        requests.map((item) => {
                            if (item.status === "awaiting") {
                                const matchingDachas = dacha.filter(dachaItem => item?.accommodation_id === dachaItem.id);
                                if (matchingDachas.length > 0) {
                                    const matchingDacha = matchingDachas[0];
                                    const currentPhotoUrl = photoUrls.find((_, index) => index === dacha.indexOf(matchingDacha));
                                    const currentClient = client.find(clientItem => clientItem.id === item.customer_id);
                                    console.log(currentPhotoUrl)
                                    return (
                                        <div className={style.sellerDashboard__new_request_item} key={item.id}>
                                            <div className={style.sellerDashboard__new_request_item_column_1}>
                                                <div className={style.sellerDashboard__new_request_item_column_photo}>
                                                    {currentPhotoUrl?.length > 0 && !isLoading ? (
                                                        <img
                                                            src={`https://visitca.travel/api${currentPhotoUrl[0]}/?token=${token}`}
                                                            alt={matchingDacha?.title}
                                                            style={{objectFit: 'cover'}}
                                                        />
                                                    ) : (
                                                        <Icon.ImgPlaceholder
                                                            width={"100%"}
                                                            height={"100%"}
                                                        />
                                                    )}
                                                </div>
                                                <div className={style.sellerDashboard__new_request_item_column_title}
                                                     style={{
                                                         overflow: "hidden",
                                                         textOverflow: "ellipsis",
                                                         whiteSpace: 'nowrap'
                                                     }}
                                                >
                                                    <h1>{matchingDacha.title}</h1>
                                                    <div
                                                        className={style.sellerDashboard__new_request_item_column_rating}>
                                                        <p>{currentClient?.username}</p>
                                                        <Score score={matchingDacha.rating}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.sellerDashboard__new_request_item_column_2}>
                                                <div className={style.sellerDashboard__new_request_item_column_2_day}>
                                                    <p><Icon.Month/>{formatDate(item?.start_day)}</p>
                                                    <p><Icon.Month/>{formatDate(item?.end_day)}</p>
                                                </div>
                                            </div>
                                            <div className={style.sellerDashboard__new_request_item_column_price}>
                                                <h1>Цена:</h1>
                                                <h1>{PriceFormat(item.requested_price)} {matchingDacha.price_type}</h1>
                                            </div>
                                            <div className={style.sellerDashboard__new_request_item_column_3}>
                                                <div
                                                    className={style.sellerDashboard__new_request_item_column_3_buttons}>
                                                    <button onClick={() => acceptRequest(item.id)}>Принять</button>
                                                    <button onClick={() => denyRequest(item.id)}>Отказать</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        }) : (
                            <div className={style.SellerDashboardNoData}>
                                <Icon.NoDocuments/>
                                <p>На данный момент ничего нету</p>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default RequestsPage;

