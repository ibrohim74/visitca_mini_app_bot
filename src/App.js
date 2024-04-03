import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { LOGIN } from "./utils/consts";
import Login from "./page/auth/login";
import { BOT } from "./utils/routes";

function App() {
    const tg = window.Telegram.WebApp
    const token = tg.CloudStorage.getItem("token");
    return (
        <BrowserRouter>
            <Routes>
                {token ? (
                    BOT.map(({ path, component }) => (
                        <Route key={path} path={path} element={component} />
                    ))
                ) : (
                    <Route path={LOGIN} element={<Login />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
