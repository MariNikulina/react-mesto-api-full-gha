import PopupWithForm from "./PopupWithForm";

function ConfirmationDelete({ card, onClose, onSubmit, loggedIn }) {

  function handleSubmit() {
    onSubmit(card);
  }

  return (
    <PopupWithForm
    onSubmitHandler={handleSubmit}
    title='Вы уверены?'
    name='confirmation'
    onClose={onClose}
    isOpen={Boolean(card)}
    buttonText='Да'
    loggedIn={loggedIn}
    />
  )
}

export default ConfirmationDelete;
