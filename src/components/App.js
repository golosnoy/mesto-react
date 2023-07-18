import React from 'react';
import { useState } from 'react';
import '../../src/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

 
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [ cards, setCards ] = useState([]);
    
    React.useEffect(() => {
        api.getUserInfo().then((res) => {setCurrentUser(res)})
        .catch((err) =>{console.log(err)});
    }, []);

    React.useEffect(() => {
        api.getCardsData().then((cards) => {setCards(cards)})
        .catch((err) =>{console.log(err)});
    }, []);

      
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };

    const handleDeleteContentClick = () => {
        setIsConfirmationPopupOpen(true)
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

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) =>{console.log(err)});
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
        .catch((err) =>{console.log(err)});
        const newCards = cards.filter(function (c) {
            if (c._id !== card._id) {
                return c;
            } 
        })
        setCards(newCards)
    }

    const handleAddPlaceSubmit = (card) => {
        api.postCard(card).then((res) => {
            setCards([res, ...cards]); 
        })
        closeAllPopups();

    };

    
    const handleUpdateUser = (newUserData) => {
        api.patchUserInfo(newUserData).then((res) => {setCurrentUser(res)})
        .catch((err) =>{console.log(err)});
        closeAllPopups();

    };

    const handleUpdateAvatar = (newAvatar) => {
        api.updateAvatar(newAvatar).then((res) => {setCurrentUser(res)})
        .catch((err) =>{console.log(err)});
        closeAllPopups();

    };

    return (
        < CardsContext.Provider value={cards} >
            < CurrentUserContext.Provider value={currentUser} >
                <div className="App">
                    <div className="page__container">
                        <Header />
                        <Main 
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onConfirmation={handleDeleteContentClick}
                            onImagePopup={handleCardClick}
                            onCardLike={handleCardLike}
                            cards={cards}
                            onCardDelete={handleCardDelete}
                            />
                        <Footer />
                        <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
                        <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                        <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />


                        {/* <PopupWithForm onClose={closeAllPopups} onSubmit={handleSubmitContent} isOpened={isAddPlacePopupOpen} styleClass="content" title="Новое место" name="new_content" buttonText="Создать"
                        children={<><input className="popup__input" type="text" name="place_name" placeholder="Название" id="place_name" minLength={2} maxLength={30} required/>
                        <span className="popup__input-error popup__input-error_place_name"></span>
                        <input className="popup__input" type="url" name="img_url" placeholder="Ссылка на картинку" id="img_url" required/>
                        <span className="popup__input-error popup__input-error_img_url"></span></>}
                        /> */}
                        <PopupWithForm onClose={closeAllPopups} isOpened={isConfirmationPopupOpen} styleClass="delete_confirmation" title="Вы уверены?" name="edit_delete_confirmation" buttonText="Да" />
                        <ImagePopup onClose={closeAllPopups} isOpened={isImagePopupOpen} card={selectedCard} /> 
                    </div> 
                </div>
            </CurrentUserContext.Provider>
        </CardsContext.Provider>
    );
}

export default App;
