import React, {useCallback, useEffect, useState} from 'react';
import {$host} from "../../utils/http/http";
import {useTelegram} from "../../hooks/useTelegram";
import {LoginAPI} from "./API/loginAPI";

const Login = () => {
    const [initial , setInitial] = useState()
    const {tgUser , tg} = useTelegram()

    const handleSend = useCallback(()=>{
        if (initial?.login && initial?.password){
            LoginAPI(initial)
        }
    })

    useEffect(() => {
        tg.onEvent('mainButtonClicked', handleSend)
        return ()=>{
            tg.offEvent('mainButtonClicked' , handleSend)
        }
    }, [handleSend]);


    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Login'
        })
    },[])

    useEffect(()=>{
        if (!initial?.login && !initial?.password){
            tg.MainButton.hide()
        }else {
            tg.MainButton.show()
        }
    },[initial?.login , initial?.password])

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