import Form from "./Form";

function PopupWithForm({ title, name, isOpen, onClose, buttonText, onSubmitHandler, inputs, loggedIn }) {

  return (
    <section className={`popup popup_popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <Form name={name} buttonText={buttonText} onSubmitHandler={onSubmitHandler} inputs={inputs} isOpen={isOpen} loggedIn={loggedIn} />
      </div>
    </section>
    )
}

export default PopupWithForm;
