import Form from "./Form";
import * as mestoAuth from "../mestoAuth";
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, loggedIn }) {

  const inputsLogin = [
    {
      type: "email",
      className: "popup__item"/*register__input"*/,
      placeholder: "Email",
      name: "identifier",
      required: true,
      id: 8
    },{
      type: "text",
      className: "popup__item"/*register__input"*/,
      placeholder: "Пароль",
      name: "sign",
      required: true,
      id: 9
    }
  ]

  function handleSubmit(formData) {
    onLogin(formData.sign, formData.identifier)
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`)
    })
  }

  return (
    <div className="login container__section">
      <h1 className="login__title">Вход</h1>
      <Form
      name="login"
      buttonText="Войти"
      onSubmitHandler={(formData) => handleSubmit(formData)}
      inputs={inputsLogin}
      loggedIn={loggedIn}
       />
    </div>
  )
}

export default Login;
