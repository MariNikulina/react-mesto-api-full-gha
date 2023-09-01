import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPath from '../images/header-logo.svg';

function Header({ handleLogin, userData }) {

  const location = useLocation();
  const navigate = useNavigate();

  let { email } = userData;
  console.log(userData)

  function signOut() {
    localStorage.removeItem('token');
    handleLogin();
    navigate('/signin', {replace: true});
  }

  const locationRegister = location.pathname === "/signup";
  const locationLogin = location.pathname === "/signin";
  const locationMain = location.pathname === "/";

  return (
    <header className="header container__section">
      <img src={logoPath} alt="Логотип" className="header__logo" />
      {locationMain && <p className="header__email">{email}</p>}
      {locationRegister && <Link to="/signin" className="header__button">Войти</Link>}
      {locationLogin && <Link to="/signup" className="header__button">Регистрация</Link>}
      {locationMain && <button onClick={signOut} type="button" className="header__button">Выйти</button>}
    </header>
  );
}

export default Header;
