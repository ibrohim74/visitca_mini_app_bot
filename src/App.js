import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import { BOT } from "./utils/routes";

function App() {
    const tg = window.Telegram.WebApp
    // URL'dan parametrlarni olish
    const urlParams = new URLSearchParams(window.location.search);

// "tgWebAppStartParam" parametri orqali token sozini olib tashlash
    const tokenParam = urlParams.get('tgWebAppStartParam');

// Token sozini olish
    const token = tokenParam.split('=')[1]; // '=' belgisidan keyin kelgan qismini olib tashlash


    return (
        // <BrowserRouter>
        //     <Routes>
        //         {urlParams ? (
        //             BOT.map(({ path, component }) => (
        //                 <Route key={path} path={path} element={component} />
        //             ))
        //         ) : (
        //             <>no token</>
        //         )}
        //     </Routes>
        // </BrowserRouter>
<>{token}

    <br/>
    {tokenParam}

    <br/>

    {urlParams}
</>
    );
}

export default App;
