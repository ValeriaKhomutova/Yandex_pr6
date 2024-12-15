
import '../pages/index.css';
import { initialCards } from './cards.js'; // Импорт initialCards
import { enableValidation } from './validate.js';
import image1 from '../images/kusto.jpg';
import image2 from '../images/logo.svg';

var Myid;
/** Popup редактирования профиля */
const popupProfile = document.querySelector('.popup_type_profile');                     // Найти popup редактирования профиля
const popupOpenEdit = document.querySelector('.profile__edit-buton');                   // Найти кнопку открытия редактирования профиля
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');       // Найти форму popup изменения профиля
const profileName = document.querySelector('.profile-info__title');                     // Найти данные - name на странице
const profileJob = document.querySelector('.profile-info__intro');                      // Найти данные - job на странице
const inputName = document.querySelector('.popup__input_type_name');                    // Найти поле ввода - name в форме редактирования профиля
const inputJob = document.querySelector('.popup__input_type_job');                      // Найти поле ввода - job в форме редактирования профиля
const profilIimage = document.querySelector('.profile__avatar'); 

const popupavatar = document.querySelector('.popup_type_avatar');
const popupFormTypeAva = popupavatar.querySelector('.popup__form_type_avatar');
const popuplinka = document.querySelector('.popup__input_type_linka');

/** Popup редактирования карточек региона */
const popupPlace = document.querySelector('.popup_type_place');                          // Найти popup редактирования карточек
const popupOpenAdd = document.querySelector('.profile__add-button');                     // Найти кнопку открытия редактирования карточек
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');              // Найти форму popup изменения карточек
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');             // Найти поле ввода - название региона в форме добавления карточки
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');               // Найти поле ввода - ссылки на фото в форме добавления карточки

/** Popup открытия просмотра изображения */
const popupImage = document.querySelector('.popup_type_image');                           // Найти popup открытия просмотра увеличенного изображения
const elementImage = document.querySelector('.popup__img');                               // Найти изображение
const elementTitle = document.querySelector('.popup__name');                              // Найти описание региона

/** Кнопка закрытия Popup */
const popupCloseList = document.querySelectorAll('.popup__button-close');                  // Найти ВСЕ кнопки закрытия Popup

/** Границы окна Popup */
const popupClosest = document.querySelectorAll('.popup');                                  // Найти границы окна при нажатии на Esc и Overlay

/** Добавление карточек */
const cardTemplate = document.querySelector('.template-card').content;                     // Найти шаблон карточки для добавления
const cardsContainer = document.querySelector('.elements');                                // Найти раздел, куда будут добавлятся карточки

/** Функция лайк-дизлайка карточки */
const bindCardLikeEventListener = (buttonLike,cardid,cardlike) => {
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
    if (evt.target.classList.contains('element__button_active')) {
      putliike(cardid,cardlike);
    } else {
      deletelike(cardid,cardlike);
    }
  });
};

/** Функция удаления карточки */
const bindCardDeleteEventListener = (cardData,cardid) => {
  cardData.addEventListener('click', (evt) => {
    console.log(cardid);
    deletecard(cardid);
    evt.target.closest('.element').remove();
  });
};

/** Функция создания карточки */
const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);                                        // Клонировать содержимое тега template
  const cardElementTitle = cardElement.querySelector('.element__title');                   // Найти в шаблоне заголовок
  const cardElementPhoto = cardElement.querySelector('.element__img');                    // Найти в шаблоне фотографию
  const cardElementLike = cardElement.querySelector('.element__button');                   // Найти кнопку нравится-ненравится
  const cardElementDel = cardElement.querySelector('.element__basket');                   // Найти кнопку удаления карточе
  if (cardData.owner._id !== Myid){cardElementDel.style.display = 'none';}
  const cardlikecnut = cardElement.querySelector('.element__button_like');
  cardElementTitle.textContent = cardData.name;                                            // Присвоить значение name заголовку
  cardElementPhoto.src = cardData.link;                                                    // Присвоить значение link ссылке на картинку
  cardElementPhoto.alt = cardData.alt;                                                     // Присвоить описание картинке
  cardlikecnut.textContent = cardData.likes.length;
  bindCardPreviewEventListener(cardElementPhoto);                                          // Открыть popup просмотра изображения карточки
  bindCardLikeEventListener(cardElementLike,cardData._id,cardlikecnut);                                              // Отметить в карточке нравится - ненравится
  bindCardDeleteEventListener(cardElementDel,cardData._id);                                             // Удалить карточку
  console.log(cardData);
  console.log(Myid);
  return cardElement;
};


/** Функция открытия просмотра изображения карточки */
const bindCardPreviewEventListener = (cardImageElement) => {
  cardImageElement.addEventListener('click', (evt) => {
    openPopup(popupImage);

    elementImage.src = cardImageElement.src;
    elementImage.alt = cardImageElement.alt;
    elementTitle.textContent = evt.target.closest('.element').textContent;
  });
};

profilIimage.addEventListener('click',(evt) => {
    openPopup(popupavatar);

})


/** Общая функция открытия Popup */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseEscapeKey);
};

/** Общая функция закрытия Popup */
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEscapeKey);
};

/**Функция закрытия по клавише Esc */
const popupCloseEscapeKey = (evt) => {
  if (evt.key === 'Escape'){
    popupClosest.forEach((popup) => {
      closePopup(popup);
    })
  }
}

/** Функция открытия Popup редактирования профиля c указанными на странице данными */
popupOpenEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

/** Функция сохранения внесенных в формы popup изменений при закрытии окна */
popupFormProfile.addEventListener('submit', (evt) => {
  console.log("OTPRAVIL..")
  patchprofile(inputName.value,inputJob.value);
  closePopup(popupProfile);
  evt.preventDefault();
});

popupFormTypeAva.addEventListener('submit', (evt) => {
  console.log("OTPRAVIL..")
  patchlogo(popuplinka.value);
  closePopup(popupavatar);
  evt.preventDefault();
});

/** Закрытие всех Popup при нажатии на крестик */
popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});

/** Закрытие всех Popup при нажатии на Overlay */
popupClosest.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});

/** Функция открытия Popup добавления карточки местности */
popupOpenAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  popupFormTitle.value = '';
  popupFormLink.value = '';
});

/** Функция сохранения внесенных в формы popup данных (название региона и ссылку на фото) при закрытии окна */
popupFormPlace.addEventListener('submit', (evt) => {

  renderCard({
    name: popupFormTitle.value,
    link: popupFormLink.value,
    likes: [],
    owner: {_id: `${Myid}`}
  });
  addcardonserver(popupFormTitle.value,popupFormLink.value);
  evt.target.reset();
  closePopup(popupPlace);
  //evt.preventDefault();
});

/** Функция добавления новой карточки в начало блока с данными из PopUp добавления новой карточки местности */

function renderCard(card){
  cardsContainer.prepend(createCard(card));
}

/**Функция возвращения события */
const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
}

//заполнение профиля данными с сервера
function takeuserdata(){
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me ', {
    headers: {authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48'},
    method: 'GET'
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res); // если мы попали в этот then, data — это объект
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    profilIimage.src = res.avatar;
    Myid = res._id;
  });

}
takeuserdata();

function takecards(){
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
    headers: {authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48'},
    method: 'GET'
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    res.forEach((cardData) => {
      cardsContainer.append(createCard(cardData,1));
    });
  });
}
takecards();

function patchprofile(name, about){
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    takeuserdata();
  });
}

function addcardonserver(name,link){
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
    method: 'POST',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
}

function deletecard(cardid){
  fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/${cardid}`, {
    method: 'DELETE',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    }
  });
}

function putliike(cardid,cardlike){
  fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${cardid}`, {
    method: 'PUT',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    cardlike.textContent = res.likes.length;
  });
}

function deletelike(cardid,cardlike){
  fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${cardid}`, {
    method: 'DELETE',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    cardlike.textContent = res.likes.length;
  });
}

function patchlogo(link){
  fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me/avatar' , {
    method: 'PATCH',
    headers: {
      authorization: '588d31a2-aacb-4a5b-b164-4d6e90b68f48 ',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${link}`
    })
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    profilIimage.src = res.avatar;
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


//
//Токен: 588d31a2-aacb-4a5b-b164-4d6e90b68f48 
//Идентификатор группы: frontend-st-cohort-201