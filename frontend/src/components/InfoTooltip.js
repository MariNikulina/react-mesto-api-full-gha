import successPath from '../images/popup-success.svg';
import failPath from '../images/popup-fail.svg';

function InfoTooltip({ name, onClose, isRegister }) {

  let path = '';
  let altText = '';
  let headerText = '';

  if (isRegister === 'ok') {
    path = successPath;
    altText = 'Иконка успешной регистрации';
    headerText = 'Вы успешно зарегистрировались!';
  } else {
    path = failPath;
    altText = 'Иконка отклоненной регистрации';
    headerText = 'Что-то пошло не так! Попробуйте ещё раз.';
  }

  return (
    /*<section className={`popup popup_popup_${name} ${Boolean(isRegister) ? 'popup_opened' : ''}`}>*/
    <section className={`popup popup_popup_${name} popup_opened`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" aria-label="Закрыть" onClick={onClose}></button>
        <img src={path} alt={altText} className="popup__result-icon" />
        <h3 className="popup__title popup__title_register-result">
          { headerText }
        </h3>
      </div>
    </section>
  )
}
export default InfoTooltip;
