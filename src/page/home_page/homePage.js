import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";

const HomePage = () => {
    const {tg} = useTelegram()
    return (
        <div>
            home
            <button onClick={()=>window.localStorage.clear()}>ufgf</button>
            <br/>
            {window.localStorage.getItem('token')}
        </div>
    );
};

export default HomePage;