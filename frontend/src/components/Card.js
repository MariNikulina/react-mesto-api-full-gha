import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      { isOwn && <button onClick={handleDeleteClick} type="button" className="card__trash-button" aria-label="Удалить"  /*onClick={handleDeleteClick}*/></button> }
      <div className="card__like-place">
        <h2 className="card__title">{card.name}</h2>
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"></button>
        <output className="card__like-number">{card.likes.length}</output>
      </div>
    </li>
  );
}

export default Card;
