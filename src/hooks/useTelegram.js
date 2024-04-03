const tg = window.Telegram.WebApp

export function useTelegram() {
    const onCloseTelegram = () => {
        tg.close()
    }

    return {
        onCloseTelegram,
        tg,
        tgUser: tg.initDataUnsafe?.user
    }
}