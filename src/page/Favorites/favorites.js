import React from 'react';
import style from './favorites.module.css'
import Header from "../../component/header/header";
import HeaderPage from "../../component/header_page/headerPage";
import {BACK_HOME} from "../../utils/consts";
import {Icon} from "../../component/icons/icon";
import Score from "../../component/score/score";
const Favorites = () => {
    return (
        <div className={'container'}>
            <Header />
            <HeaderPage url={BACK_HOME} title={'Избранные'} />

            <div className={style.favorite_list}>
                <div className={style.favorite_item}>
                    <div className={style.favorite_item_left}>
                        <h1>Hilton Plaza 777</h1>
                        <p>Самаркандская область, Самарканд</p>
                        <h2>200.000 Сум</h2>
                    </div>
                    <div className={style.favorite_item_right}>
                        <div className={style.favorite_item_button}>
                            <Icon.Star/>
                        </div>
                        <div className={style.favorite_item_stat}>
                            <h1>4.5</h1>
                            <p>2032 отзывов</p>
                        </div>
                        <div className={style.favorite_item_rating}>
                            <Score score={3}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;