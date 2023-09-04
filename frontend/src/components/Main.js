import React from "react";
import { api } from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete  }) {

  const currentUser = React.useContext(CurrentUserContext);
  console.log(`cards main: ${cards}`);
  return (
    <main className="content">
      <section className="profile content__section">
        <div className="profile__img-wrap" onClick={onEditAvatar}>
          <img src={`${currentUser.avatar}`} alt="Аватарка" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Редактировать"></button>
          <p className="profile__title-subline">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добавить"></button>
      </section>
      <section className="photo-grid content__section">
        <ul className="photo-grid__list">
          { cards.map((cardElement) => (
            <Card
            card={cardElement}
            key={cardElement._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
