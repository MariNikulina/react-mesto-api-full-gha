import React from "react";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationDelete from "./ConfirmationDelete";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as mestoAuth from "../mestoAuth";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] =  React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState([]);
  const [ selectedDeletedCard, setSelectedDeletedCard ] = React.useState(null);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ userData, setUserData ] = React.useState({});
  const [ isRegister, setIsRegister ] = React.useState('');
  const navigate = useNavigate();

  const tokenCheck = () => {
    // const jwt = localStorage.getItem('token');
    // console.log(`jwt: ${jwt}`);
    // if (jwt) {

      mestoAuth.getContent().then((res) => {
        if (res?._id) {
          const userData = {
            email: res.email
          }
          setLoggedIn(true);
          setUserData(userData);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`)
      })
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn) {

      api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(`${err}`);
    });

    api.getInitialCards()
    .then((res) => {
      console.log(`cards: ${res}`);
      setCards(res);
    })
    .catch((err) => {
      console.log(`${err}`);
    });

    }

  }, [loggedIn])


  function handleDeletedCardClick(card) {
    setSelectedDeletedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setSelectedDeletedCard(null);
    setIsRegister('');
  }

  function handleCardLike(card) {
    console.log(`card: ${card.likes}`);
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id)
      .then((newCard) => {
        console.log(`newcard: ${newCard}`);
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    } else {
      api.likeCard(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((deletedCard) => {
      setCards((state) => state.filter(i => i._id !== card._id));
    })
    .then((res) => {
      setSelectedDeletedCard(null);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
  }

  function handleUpdateUser({ name, about }) {
    console.log(`name: ${name}`);
    setIsLoading(true);
    api.updateUserInfo({ name, about })
    .then(({ name, about, avatar, _id }) => {
      console.log(_id);
        setCurrentUser({ name: name, about: about, avatar: avatar, _id: _id });
    })
    .then((res) => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }


  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.updateAvatar({ avatar })
    .then((newUser) => {
      console.log(newUser)

      setCurrentUser({ name: newUser.name, about: newUser.about, avatar: newUser.avatar, _id: newUser._id });

    })
    .then((res) => {
      console.log(currentUser)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api.createNewCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then((res) => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleLoginFalse() {
    setLoggedIn(false);
  }

  //открытие попапа при неудачной регистрации
  function handleRegisterFail() {
    setIsRegister('fail');
  }

  function onLogin(sign, identifier) {

    return  mestoAuth.authorize(sign, identifier)
    .then((data) => {
      // console.log(data);
      // console.log(document.cookie);

      if (data._id) {
        const userData = {
          email: identifier
        };
        setUserData(userData);
        // localStorage.setItem('token', data.token);
        // console.log(`token: ${data.token}`);
        setLoggedIn(true);
        navigate('/', {replace: true});
      }
    })
  }

  function onRegister(password, email) {
    return mestoAuth.register( password, email ).then((res) => {
      console.log(`reg: ${res}`)
      if (res) {
        setIsRegister('ok');
        navigate('/signin', {replace: true});
      }
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
        <Header handleLogin={handleLoginFalse} userData={userData} />
        <Routes>
          <Route path="/signup" //path="/sign-up"
          element={<Register
            loggedIn={loggedIn}
            onRegister={onRegister}
            onPopupFailOpen={handleRegisterFail}
            />}
          />
          <Route path="/signin" element={<Login onLogin={onLogin} loggedIn={loggedIn} />} />
          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onCardClick={(card) => handleCardClick(card)}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardLike={(card) => handleCardLike(card)}
            cards={cards}
            onCardDelete={(card) => handleDeletedCardClick(card)}
            />}
          />

        </Routes>

        {loggedIn && <Footer />}
        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
        onUpdateUser={(formData) => handleUpdateUser({ name: formData.inputName, about: formData.inputJob })}
        loggedIn={loggedIn}
        />
        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
        onAddPlace={(formData) => handleAddPlaceSubmit({ name: formData.inputTitle, link: formData.inputHref})}
        loggedIn={loggedIn}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmationDelete
        onClose={closeAllPopups}
        card={selectedDeletedCard}
        onSubmit={(card) => handleCardDelete(card)}
        loggedIn={loggedIn}
        />
        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
        onUpdateAvatar={(formData) => handleUpdateAvatar({ avatar: formData.inputAvatarHref})}
        loggedIn={loggedIn}
        />
        { isRegister && <InfoTooltip
        name='infoTooltip'
        onClose={closeAllPopups}
        isRegister={isRegister}
        />
}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
