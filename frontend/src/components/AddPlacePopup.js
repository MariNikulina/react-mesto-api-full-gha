import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, loggedIn }) {

  const inputsAddPlacePopup = [
    {
      type: "text",
      className: "popup__item popup__item_type_title",
      placeholder: "Название",
      name: "inputTitle",
      required: true,
      minLength: "2",
      maxLength: "30",
      id: 3
    },{
      type: "url",
      className: "popup__item popup__item_type_href",
      placeholder: "Ссылка на картинку",
      name: "inputHref",
      required: true,
      id: 4
    }
  ]

  return (
    <PopupWithForm
    title='Новое место'
    name='cards'
    isOpen={isOpen}
    onClose={onClose}
    buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
    inputs={inputsAddPlacePopup}
    onSubmitHandler={onAddPlace}
    loggedIn={loggedIn}
    />
  )
}

export default AddPlacePopup;
