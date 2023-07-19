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
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

 
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    
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
    };

    const closeImagePopup = () => {
        setSelectedCard(null);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) =>{console.log(err)});
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter(function (c) {
                if (c._id !== card._id) {
                    return c;
                } 
            })
            setCards(newCards)
        })
        .catch((err) =>{console.log(err)}); 
    }

    const handleAddPlaceSubmit = (card) => {
        api.postCard(card).then((res) => {
            setCards([res, ...cards]); 
            closeAllPopups();
        })
        .catch((err) =>{console.log(err)});  
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
                    <PopupWithForm onClose={closeAllPopups} isOpened={isConfirmationPopupOpen} styleClass="delete_confirmation" title="Вы уверены?" name="edit_delete_confirmation" buttonText="Да" />
                    <ImagePopup onClose={closeImagePopup} card={selectedCard} /> 
                </div> 
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
