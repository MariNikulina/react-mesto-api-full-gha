import Form from "./Form";
import * as mestoAuth from "../mestoAuth";
import { Link, useNavigate } from 'react-router-dom';

function Register({ loggedIn, onRegister, onPopupFailOpen }) {

  const inputsRegister = [
    {
      type: "email",
      className: "popup__item"/*register__input"*/,
      placeholder: "Email",
      name: "email",
      required: true,
      id: 6
    },{
      type: "text",
      className: "popup__item"/*register__input"*/,
      placeholder: "Пароль",
      name: "password",
      required: true,
      id: 7
    }
  ]

  const navigate = useNavigate();

function handleSubmit(formData) {
  const { email, password } = formData;
  onRegister( password, email )
  .catch((err) => {
    onPopupFailOpen();
    console.log(`Ошибка: ${err.status}`)
  })
}

  return (
    <div className="register container__section">
      <h1 className="register__title">Регистрация</h1>
      <Form
      name="register"
      buttonText="Зарегистрироваться"
      onSubmitHandler={(formData) => handleSubmit(formData)}
      inputs={inputsRegister}
      loggedIn={loggedIn} />
      <div className="register__signin">
        <p className="register__redirection">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link">Войти</Link>
      </div>
    </div>

  )
}

export default Register;
