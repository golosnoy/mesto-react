function Card(props) {
    const {onImagePopup} = props;

    return(
        <li className="cards__element">
            <img onClick={onImagePopup.bind(null, props)} className="cards__image" src={props.src} alt={props.title} />
            <div className="cards__desc">
                <h2 className="cards__title">{props.title}</h2>
                <div className="cards__likes_block">
                    <button type="button" aria-label="Нравится" className="cards__like"></button>
                    <p className="cards__likes_counter">{props.likes}</p>
                </div>
                <button type="button" aria-label="Корзина" className="cards__trash"></button>
            </div>
        </li>
    );
}

export default Card