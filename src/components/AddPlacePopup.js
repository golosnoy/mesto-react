import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {isOpened} = props;
  const {onClose} = props;
  const {onAddPlace} = props;
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg ] = useState('');

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceImg(e) {
    setPlaceImg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        name: placeName,
        link: placeImg,
    });
    const form = document.getElementsByName('new_content')[0];
    form.reset();
  } 

  return(
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpened={isOpened} styleClass="content" title="Новое место" name="new_content" buttonText="Создать"
    children={<>
    <input onChange={handleChangePlaceName} className="popup__input" type="text" name="place_name" placeholder="Название" id="place_name" minLength={2} maxLength={30} required/>
    <span className="popup__input-error popup__input-error_place_name"></span>
    <input onChange={handleChangePlaceImg} className="popup__input" type="url" name="img_url" placeholder="Ссылка на картинку" id="img_url" required/>
    <span className="popup__input-error popup__input-error_img_url"></span></>}
    />
  );
}

export default AddPlacePopup