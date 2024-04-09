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
    const token = urlParams.get('token');



    return (
        <BrowserRouter>
            <Routes>

                {token ? (
                    BOT.map(({ path, component }) => (
                        <Route key={path} path={path} element={component} />
                    ))
                ) : (
                    <>no token</>
                )}
            </Routes>
        </BrowserRouter>

    );
}

export default App;
