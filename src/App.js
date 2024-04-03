import './App.css';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { LOGIN } from "./utils/consts";
import Login from "./page/auth/login";
import { BOT } from "./utils/routes";
import {useTelegram} from "./hooks/useTelegram";
const {tg}= useTelegram()
function App() {
    const token = tg.CloudStorage.getItem("token");
    console.log(token);
    return (
        <BrowserRouter>
            <Routes>
                {token !== null ? (
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
