import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, loggedIn }) {

  const inputsEditAvatarPopup = [
    {
      type: "url",
      className: "popup__item popup__item_type_avatar",
      placeholder: "Ссылка на аватар",
      name: "inputAvatarHref",
      required: true,
      id: 5
    }
  ]

  return (
    <PopupWithForm
    title='Обновить аватар'
    name='avatar'
    isOpen={isOpen}
    onClose={onClose}
    buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
    inputs={inputsEditAvatarPopup}
    onSubmitHandler={(formData) => onUpdateAvatar(formData)}
    loggedIn={loggedIn}
    />
  )
}

export default EditAvatarPopup;
