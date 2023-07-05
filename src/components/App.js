import React from 'react';
import { useState } from 'react';
import '../../src/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWitnForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
 
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState("");
    
    
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    };

    return (
        <div className="App">
            <div className="page__container">
                <Header />
                <Main 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onImagePopup={handleCardClick}
                    />
                <Footer />
                <PopupWitnForm onClose={closeAllPopups} isOpened={isEditProfilePopupOpen} styleClass="profile" title="Редактировать профиль" name="edit_profile" buttonText="Сохранить"
                children={<><input className="popup__input" type="text" name="name" placeholder="Имя" id="name" minLength={2} maxLength={40} required />
                <span className="popup__input-error popup__input-error_name"></span>
                <input className="popup__input" type="text" name="about" placeholder="О себе" id="about" minLength={2} maxLength={200} required />
                <span className="popup__input-error popup__input-error_about"></span></>}
                />
                <PopupWitnForm onClose={closeAllPopups} isOpened={isAddPlacePopupOpen} styleClass="content" title="Новое место" name="new_content" buttonText="Создать"
                children={<><input className="popup__input" type="text" name="place_name" placeholder="Название" id="place_name" minLength={2} maxLength={30} required/>
                <span className="popup__input-error popup__input-error_place_name"></span>
                <input className="popup__input" type="url" name="img_url" placeholder="Ссылка на картинку" id="img_url" required/>
                <span className="popup__input-error popup__input-error_img_url"></span></>}
                />
                <PopupWitnForm onClose={closeAllPopups} isOpened={isEditAvatarPopupOpen} styleClass="avatar" title="Обновить аватар" name="edit_avatar" buttonText="Сохранить"
                children={<><input className="popup__input" type="url" name="profile_avatar" placeholder="Ссылка на аватар" id="profile_avatar" minLength={2} required />
                <span className="popup__input-error popup__input-error_profile_avatar"></span></>}
                />
                <PopupWitnForm onClose={closeAllPopups} isOpened={isEditAvatarPopupOpen} styleClass="delete_confirmation" title="Вы уверены?" name="edit_delete_confirmation" buttonText="Да" />
                <ImagePopup onClose={closeAllPopups} isOpened={isImagePopupOpen} card={selectedCard} /> 
            </div> 
        </div>
    );
}

export default App;
