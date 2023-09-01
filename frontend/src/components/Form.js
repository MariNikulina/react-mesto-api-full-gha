import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Form({ name, buttonText, onSubmitHandler, inputs=[], isOpen, loggedIn }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ formData, setFormData ] = React.useState({});
  const [ formErrors, setFormErrors ] = React.useState({});
  const [ formValidity, setFormValidity ] = React.useState({});


  React.useEffect(() => {
    setFormErrors({});
    setFormValidity({});
    setFormData(defineDefaultValues());
  }, [currentUser, isOpen])


  function isDisabled() {
    if (inputs.length === 0) {
      return false
    } else if (
        Object.keys(formData).length === 0 ||
        Object.keys(formData).some(item => !formData[item] || formData[item] === '') ||
        Object.keys(formErrors).some(item => formErrors[item] && formErrors[item] !== '') ||
        Object.keys(formValidity).length === 0)
      {return true}
  }

  const defineDefaultValues = () => inputs.reduce((sum, input) => {
      sum[input.name] = input.defaultValue || '';
      return sum;
    }, {})


  function onSubmit(e) {
    e.preventDefault();

    onSubmitHandler(formData);

    setFormData({});
    setFormErrors({});
    setFormValidity({});
  }

  return (
    <form action="#" className="popup__form" name={name} onSubmit={onSubmit} noValidate="">
      <fieldset className="popup__input-container">

      {inputs.map(({ type, className, placeholder, name, required, minLength, maxLength, id }) => {
        return (
            <label className="popup__label" key={id}>
              <input
              type={type}
              className={`${className} ${formErrors[name] ? 'popup__item_type_error' : ''} ${loggedIn ? '' : 'popup__item_off-logged'}`}
              placeholder={placeholder}
              name={name}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              value={formData[name] || ''}
              onChange={(e) => {
                setFormData({...formData, [name]: e.target.value});
                const errorMessage = e.target.validationMessage;
                setFormErrors({...formErrors, [name]: errorMessage || ''});
                const validityValid = e.target.validity.valid;
                setFormValidity({...validityValid, [name]: validityValid || ''});
              }}
              />
              <span className={`popup__error ${formErrors[name] ? 'popup__error_visible' : ''}`} id={`${name}-error`}>{formErrors[name]}</span>
            </label>
        )
      })}
      </fieldset>
      <input disabled={isDisabled()} type="submit" className={`popup__button ${isDisabled() ? 'popup__button_disabled' : ''} ${loggedIn ? '' : 'popup__button_off-logged'}`} value={buttonText} />
    </form>
  )
}

export default Form;
