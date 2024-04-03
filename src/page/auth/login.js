import React, {useState} from 'react';
import {$host} from "../../utils/http/http";
import {useTelegram} from "../../hooks/useTelegram";

const Login = () => {
    const [initial , setInitial] = useState({
        login: '',
        password: ''
    })
    const {onToggleButtonTg , tgUser} = useTelegram()

    const handleSend = async () => {
        onToggleButtonTg()
        if (initial?.login && initial?.password){
            try {
                const res = await $host.post("login", initial);
                localStorage.setItem("token", res.data.access_token);
                console.log(res.data);
                return res.data.access_token;
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div>
            <input type="text" onChange={e=>setInitial({...initial , login: e.target.value})}/>
            <input type="text" onChange={e=>setInitial({...initial , password: e.target.value})}/>
            <button onClick={handleSend}>send</button>

            {tgUser?.username}
        </div>
    );
};

export default Login;