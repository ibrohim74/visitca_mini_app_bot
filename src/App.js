import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import { BOT } from "./utils/routes";
import {useEffect} from "react";

function App() {
    const tg = window.Telegram.WebApp
    // URL'dan parametrlarni olish
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    useEffect(()=>{
        tg.expand()
    },[])

    return (
        <BrowserRouter>
            <Routes>

                {token ? (
                    BOT.map(({ path, component }) => (
                        <Route key={path} path={path} element={component} />
                    ))
                ) : (
                    tg.close()
                )}
            </Routes>
        </BrowserRouter>

    );
}

export default App;
