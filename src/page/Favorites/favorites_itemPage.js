import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GetAnnouncementById} from "../bookings_page/API/bookingAPI";
import {Button, Modal} from "antd";

const FavoritesItemPage = () => {
    const [dacha , setDacha] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const {id} = useParams();

useEffect(()=>{
    GetAnnouncementById(id).then(r => {
        if (r.status === 200) {
            setDacha(r.data);
        }
    });
},[])

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};

export default FavoritesItemPage;