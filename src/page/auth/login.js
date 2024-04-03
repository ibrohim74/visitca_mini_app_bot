import React, {useState} from 'react';
import {$host} from "../../utils/http/http";

const Login = () => {
    const [initial , setInitial] = useState({
        login: '',
        password: ''
    })

    const handleSend = async () => {
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
        </div>
    );
};

export default Login;