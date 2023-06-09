let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let eventName = isMobile ? "touchmove" : "wheel";

const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );

const isChrome = window.navigator.userAgent.indexOf("Chrome") > -1;

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
        let stikyContainerHeight = container.querySelector("main").scrollWidth;
        // isChrome
        //   ? (stikyContainerHeight = stikyContainerHeight / 1.8)
        //   : stikyContainerHeight;

        container.setAttribute(
          "style",
          "height: " + stikyContainerHeight + "px" // можно поменять если слишком много/мало
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

//Скрытие картинок при очень маленькой высоте

// function removeSliderImg() {
//   if (window.innerHeight < 600) {
//     const img = document.querySelectorAll(".how-we-work__picture");
//     img.forEach((el) => {
//       el.style.display = "none";
//     });
//     // img.style.display = "none";
//   }
//   console.log(window.innerHeight);
// }
//removeSliderImg();
// const removeSliderImg = () => {
//   console.log("hello");
// };

//How we work mobile scroll slider
function mobileScroll() {
  const howWeWork = document.querySelector("#how-we-work");
  const sections = document.querySelectorAll("section");

  if (window.screen.width < 1025) {
    //450
    console.log("mobile");
    howWeWork.classList.remove("how-we-work");
    howWeWork.classList.add("how-we-work-mobile");
    howWeWork.childNodes[1].classList.remove("sticky-container");
    howWeWork.childNodes[1].classList.add("sections");

    sections.forEach((element) => {
      element.classList.add("section_item");
    });
  }
}
mobileScroll();

// Открытие соглашения об испольновании сайта

const popUpCloseBtn = document.querySelectorAll(".popup__close-btn");
const popUp = document.querySelectorAll(".popup__block");

const useAgreementOpen = document.querySelector(".discuss__use-agreement");
useAgreementOpen.addEventListener("click", () => {
  popUp[0].style.display = "flex";
  document.body.style.overflow = "hidden";
});

//Закрытие кликом по фону

popUp[0].addEventListener("click", (e) => {
  if (e.target.className == "popup__block use-agreement") {
    popUp[0].style.display = "none";
    document.body.style.overflow = "visible";
  }
});
//Закрытие кнопкой

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

//Закрытие кликом по фону

popUp[1].addEventListener("click", (e) => {
  if (e.target.className == "popup__block personal-info") {
    popUp[1].style.display = "none";
    document.body.style.overflow = "visible";
  }
});

//Закрытие кнопкой

popUpCloseBtn[1].addEventListener("click", () => {
  popUp[1].style.display = "none";
  document.body.style.overflow = "visible";
});

console.log(document.querySelector(".active"));

//Подсвечивание в шапке

const changeNav = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // document.querySelector(".active").classList.remove("active");
      let id = entry.target.getAttribute("id");
      let headerLink = document.querySelector(`.header__${id}`);
      let navBarLink = document.querySelector(`[href="#${id}"]`);
      const screenWidth = window.screen.width;
      console.log(id);

      if (headerLink && id !== "app" && screenWidth > 1040) {
        // headerLink.childNodes[1].classList.add("active");
        document.querySelector(".active").classList.remove("active");
        headerLink.classList.add("active");
      }

      if (screenWidth <= 1040) {
        document.querySelector(".active").classList.remove("active");
        navBarLink.parentNode.classList.add("active");
      }
    }
  });
};

const options = {
  threshold: 0.1,
};
const observer = new IntersectionObserver(changeNav, options);
const sections = document.querySelectorAll("div[id]");

sections.forEach((section) => {
  observer.observe(section);
});

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

const selectedCasesChilds = document.querySelector(
  ".selected-cases__bottom_content"
);
const addButton = document.querySelector(".selected-cases__add");

addButton.addEventListener("click", () => {
  if (selectedCasesChilds.childNodes[9].style.display == "inherit") {
    selectedCasesChilds.childNodes[13].style.display = "inherit"; //alfa
    addButton.style.display = "none";
  }
  selectedCasesChilds.childNodes[5].style.display = "inherit"; //bicycle
  selectedCasesChilds.childNodes[7].style.display = "inherit"; //peterghof
  selectedCasesChilds.childNodes[9].style.display = "inherit"; // glonass

  document.querySelector(".selected-cases__add-text-h3").textContent =
    "Нажмите, чтобы загрузить еще 1 работу";
  addButton.style.margin = "20px 0 0 0";
});

//Текущая дата в футере
let year = new Date().getFullYear();
const footerCurrentYear = (document.querySelector(
  ".footer__current-year"
).textContent = `${year} год`);
