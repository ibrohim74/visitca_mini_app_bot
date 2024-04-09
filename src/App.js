import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import { BOT } from "./utils/routes";

function App() {
    const tg = window.Telegram.WebApp
     const urlParams = new URLSearchParams(window.location.search);

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
<>{urlParams}</>
    );
}

export default App;
