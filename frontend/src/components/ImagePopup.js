function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_popup_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_popup_image">
        <button type="button" className="popup__close-icon" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__figure">
          <img src={card ? card.link : '#' } alt={card ? card.name : '#' } className="popup__picture" />
          <figcaption className="popup__title popup__title_popup_image">{card ? card.name : '#' }</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;