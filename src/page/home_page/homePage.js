import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";

const HomePage = () => {
    const {tg} = useTelegram()
    return (
        <div>
            home
            <button onClick={tg.CloudStorage.removeItem('token')}>ufgf</button>
            <br/>
            {tg.CloudStorage.getItem('token')}
        </div>
    );
};

export default HomePage;