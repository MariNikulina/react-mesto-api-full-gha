import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, loggedIn }) {

  const currentUser = React.useContext(CurrentUserContext);

  const inputsEditProfilePopup = [
    {
      type: "text",
      className: "popup__item popup__item_type_name",
      placeholder: "Имя",
      name: "inputName",
      required: true,
      minLength: "2",
      maxLength: "40",
      defaultValue: currentUser.name,
      id: 1
    },{
      type: "text",
      className: "popup__item popup__item_type_job",
      placeholder: "О себе",
      name: "inputJob",
      required: true,
      minLength: "2",
      maxLength: "200",
      defaultValue: currentUser.about,
      id: 2
    }
  ]

  return (
    <PopupWithForm
    title='Редактировать профиль'
    name='profile'
    isOpen={isOpen}
    onClose={onClose}
    buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
    inputs={inputsEditProfilePopup}
    onSubmitHandler={onUpdateUser}
    loggedIn={loggedIn}
    />
  )
}

export default EditProfilePopup;
