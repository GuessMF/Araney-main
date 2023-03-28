let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let eventName = isMobile ? "touchmove" : "wheel";

console.log(eventName);

window.addEventListener("touchstart", touchStart, false);

let start = {y: 0};
let started = 0;
function touchStart(event) {
  start.y = event.touches[0].clientY;
}

(function () {
  init();
  function init() {
    setStickyContainersSize();
    bindEvents();
  }

  function bindEvents() {
    window.addEventListener(eventName, wheelHandler);
  }

  function setStickyContainersSize() {
    document
      .querySelectorAll(".sticky-container")
      .forEach(function (container) {
        const stikyContainerHeight =
          container.querySelector("main").scrollWidth;
        container.setAttribute(
          "style",
          "height: " + stikyContainerHeight + "px"
        );
      });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
  }

  function wheelHandler(evt) {
    const containerInViewPort = Array.from(
      document.querySelectorAll(".sticky-container")
    ).filter(function (container) {
      return isElementInViewport(container);
    })[0];

    if (!containerInViewPort) {
      return;
    }

    let isPlaceHolderBelowTop =
      containerInViewPort.offsetTop < document.documentElement.scrollTop;

    let isPlaceHolderBelowBottom =
      containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
      document.documentElement.scrollTop;

    let g_canScrollHorizontally =
      isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

    if (g_canScrollHorizontally) {
      containerInViewPort.querySelector("main").scrollLeft += evt.deltaY;
    }

    if (g_canScrollHorizontally && eventName == "touchmove") {
      offset = {};
      offset = start.y - evt.touches[0].clientY;
      started += (offset / 20) * 0.8;

      containerInViewPort.querySelector("main").scrollLeft += started;
    }
  }
})();

//
//
// Нужно поймать кинетический скролл на мобильном устройстве, иначе он проскакиваем мимо нужного контейнера
//
//

// let item = document.querySelector(".sticky-container");
// const rect = item.getBoundingClientRect();
// console.log(rect.top);
// document.addEventListener("scroll", () => {
//   console.log(window.pageYOffset);
//   // document.body.style.overflow = "hidden";
// });

// document.getElementById("how-we-work").addEventListener(
//   "touchmove",
//   function (event) {
//     event.preventDefault();
//   },
//   false
// );

window.addEventListener("scroll", function () {
  if (window.pageYOffset) {
    //&& window.pageYOffset <= 3525
    console.log("visible");
    console.log(window.pageYOffset);
    // document.body.style.overflow = "hidden";
    // setTimeout(() => {
    //   document.body.style.overflow = "visible";
    // }, 1000);
  }
});

// открытие соглашения об испольновании сайта
const popUpCloseBtn = document.querySelectorAll(".popup__close-btn");
const popUp = document.querySelectorAll(".popup__block");

const useAgreementOpen = document.querySelector(".discuss__use-agreement");
useAgreementOpen.addEventListener("click", () => {
  popUp[0].style.display = "flex";
  document.body.style.overflow = "hidden";
});
//закрытие кликом по фону
popUp[0].addEventListener("click", (e) => {
  if (e.target.className == "popup__block use-agreement") {
    popUp[0].style.display = "none";
    document.body.style.overflow = "visible";
  }
});
popUpCloseBtn[0].addEventListener("click", () => {
  popUp[0].style.display = "none";
  document.body.style.overflow = "visible";
});

// Открытие правил обработки перс данных

const personalInfoOpen = document.querySelector(".discuss__personal-info");
personalInfoOpen.addEventListener("click", () => {
  popUp[1].style.display = "flex";
  document.body.style.overflow = "hidden";
});
//закрытие кликом по фону
popUp[1].addEventListener("click", (e) => {
  if (e.target.className == "popup__block personal-info") {
    popUp[1].style.display = "none";
    document.body.style.overflow = "visible";
  }
});
popUpCloseBtn[1].addEventListener("click", () => {
  popUp[1].style.display = "none";
  document.body.style.overflow = "visible";
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//Закрытие гамбургер меню
const items = document.querySelector(".menu-items");
items.addEventListener("click", (e) => {
  const {target} = e;
  if (target.matches("a")) {
    checkToggle = document.getElementById("toggle");
    checkToggle.checked = false;
  }
});

//Появляющиеся элементы в Избранных кейсах
const addButton = document.querySelector(".selected-cases__add");
const bicycleCity = document.querySelector(".selected-cases__bicycle-city");
const peterhof = document.querySelector(".selected-cases__peterhof");
const glonass = document.querySelector(".selected-cases__glonass");
const alfaMk = document.querySelector(".selected-cases__alfa-mk");

addButton.addEventListener("click", () => {
  if (glonass.style.display == "inherit") {
    alfaMk.style.display = "inherit";
    addButton.style.display = "none";
  }
  bicycleCity.style.display = "inherit";
  peterhof.style.display = "inherit";
  glonass.style.display = "inherit";
  document.querySelector(".selected-cases__add-text-h3").textContent =
    "Нажмите, чтобы загрузить еще 1 работу";
  addButton.style.margin = "20px 0 0 0";
});

//Текущая дата в футере
let year = new Date().getFullYear();
const footerCurrentYear = (document.querySelector(
  ".footer__current-year"
).textContent = `${year} год`);
