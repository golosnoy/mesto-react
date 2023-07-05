import React from "react";
import { useState } from "react";
import { api } from "../utils/api"
import Card from "./Card";

function Main(props) {
    const {onEditProfile, onAddPlace, onEditAvatar, onImagePopup} = props;
    const [ userName, setUserName ] = useState('');
    const [ userDescription, setUserDecsription ] = useState('');
    const [ userAvatar, setUserAvatar ] = useState('');
    const [ cards, setCards ] = useState([]);
    
    React.useEffect(() => {
        api.getUserInfo()
        .then((res) => {
            setUserName(res.name);
            setUserDecsription(res.about);
            setUserAvatar(res.avatar);
        })
        .catch((err) =>{
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        api.getCardsData()
        .then((cards) => {
            setCards(
                cards.map((card) => ({
                    id: card._id,
                    src: card.link,
                    title: card.name,
                    likes: card.likes.length,
                }))

            );
        })
        .catch((err) =>{
            console.log(err);
        });
    }, []);

    return(
    <main className="content">
        <section className="profile">
            <div className="profile__card">
                <div className="profile__avatar-container">
                  <img  className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
                  <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
            </div>
            <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить контент"></button>
        </section>

        <section className="cards">
            <ul className="cards__elements">
                {
                    cards.map(({id, ...props}) => (
                        <Card key={id} onImagePopup={onImagePopup} {...props} />
                    ))
                }
            </ul>
        </section>
    </main>
    );
}

export default Main;