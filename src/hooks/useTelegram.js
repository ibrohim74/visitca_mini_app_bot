const tg = window.Telegram.WebApp

export function useTelegram() {
    const onCloseTelegram = () => {
        tg.close()
    }
    const onToggleButtonTg = ()=>{
        if (tg.MainButton.isVisible){
            tg.MainButton.hide()
        }else {
            tg.MainButton.show()
        }
    }
    return {
        onCloseTelegram,
        onToggleButtonTg,
        tg,
        tgUser: tg.initDataUnsafe?.user
    }
}