import React from "react";

function PopupWitnForm(props) {
    const {onClose, isOpened, styleClass, buttonText, children} = props;

    return (
        <div className={`popup popup_${styleClass} ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className="popup__form" name={props.name} noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    {children}
                    <button className="popup__submit-button" type="submit">{buttonText}</button>
                    <button onClick={onClose} className="popup__close-button" type="button"></button>
                </form>
            </div>
        </div>
    );
}

export default PopupWitnForm