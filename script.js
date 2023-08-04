"use strict";
const DivButton = document.querySelector(".divButton");
const Phrase = document.querySelector(".phrase");
const Name = document.querySelector(".name");
const SpriteDiv = document.querySelector(".sprite");
const DivBackground = document.querySelector(".divBackground");
const Footer = document.querySelector(".footer");
const IconVie = document.querySelector(".fa-eye");
const IconSave = document.querySelector(".fa-folder");
const NewGameBtn = document.querySelector(".NewGameBtn");
const LoadGameBtn = document.querySelector(".LoadGameBtn");

let STARTFLAG = true;
let INDEX = 0;
let TEMP;
let MUSIC;
let SOUND;
let SPEEDTEXT = 15; //от 1 до 30 (по умолчанию 15)

let TempToLocalStorage = {
  color: "none",
  background: "none",
  music: "none",
};
let spriteArrTolocalStorage = [];

//
//Готовые функции
//

//функция из строки
function evaluateFunction(fnStr, param) {
  window[fnStr](param);
}

//смена фона
function FNchangeBackgroundImage(url) {
  DivBackground.style.backgroundImage = `url(${url})`;
  TempToLocalStorage.background = url;
}

//смена имени
function FNchangeName(name) {
  Name.innerHTML = name.name;
  Name.style.color = name.color;
  TempToLocalStorage.color = name;
}

//ставим спрайт
function FNputSprait(SpraitArr) {
  let sprait = SpraitArr[0];
  let size = SpraitArr[1];
  let top = SpraitArr[2];
  let left = SpraitArr[3];
  let delay = SpraitArr[4];
  let divContainer = document.createElement("div");
  // Задание стиля
  divContainer.style.backgroundImage = `url(${sprait})`;
  divContainer.style.position = "absolute";
  divContainer.style.zIndex = "20";
  divContainer.style.width = "100%";
  divContainer.style.height = "100%";
  divContainer.style.backgroundRepeat = "no-repeat";
  //
  divContainer.style.backgroundSize = `${size}%`;
  divContainer.style.top = `${top}%`;
  divContainer.style.left = `${left}%`;
  //задержка при появлении
  setTimeout(() => {
    divContainer.style.opacity = "1";
  }, delay);
  //добавляем спец класс, чтобы потом удалять спрайты
  let classDelete = sprait.replace(/[.:/]/g, "");
  divContainer.classList.add("spraitTransform");
  divContainer.classList.add(classDelete);
  // Добавление созданного элемента в <body>
  DivBackground.appendChild(divContainer);
  //Спрайт в spriteArrTolocalStorage
  spriteArrTolocalStorage.push(SpraitArr);
}

//удалить спрайт
function FNdeleteSprait(Sprait) {
  let classDelete = Sprait.replace(/[.:/]/g, "");
  let SpraitToDelete = document.querySelector(`.${classDelete}`);
  SpraitToDelete.parentNode.removeChild(SpraitToDelete);
  //удалить из spriteArrTolocalStorage
  spriteArrTolocalStorage;
  for (let i = 0; i < spriteArrTolocalStorage.length; i++) {
    let tempSprite = spriteArrTolocalStorage[0];
    let tempUrl = tempSprite[0];
    if (tempUrl == Sprait) {
      spriteArrTolocalStorage.splice(i, 1);
    }
  }
}

//ставим удаляем музыку
function FNmusic(url) {
  TempToLocalStorage.music = `none`;
  try {
    MUSIC.pause();
    if (typeof url == "function") return;
  } catch (error) {}
  if (url != "stop") {
    MUSIC = new Audio(url);
    MUSIC.loop = true;
    MUSIC.play();
    TempToLocalStorage.music = url;
  }
}

//ставим удаляем звуки
function FNsound(url) {
  try {
    SOUND.pause();
    if (typeof url == "function") return;
  } catch (error) {}
  if (url != "stop") {
    SOUND = new Audio(url);
    SOUND.play();
  }
}

//Функция показа фона
IconVie.addEventListener("click", () => {
  Footer.classList.add("hidden");
  //Создаем див
  let divVie = document.createElement("div");
  divVie.classList.add("divVie");
  document.body.appendChild(divVie);
  //добавляем слушатель
  divVie.addEventListener("click", () => {
    Footer.classList.remove("hidden");
    divVie.parentNode.removeChild(divVie);
        //тест
    window.scrollTo(0, 1);
    document.body.requestFullScreen();
    alert('123');
  });
});

//Функция выбора (выбор из двух)
function FNdoChoice() {
  //
  let text1 = mainArr[INDEX - 1];
  let root1 = mainArr[INDEX];
  let text2 = mainArr[++INDEX];
  let root2 = mainArr[++INDEX];
  /* let nextWord = mainArr[++INDEX]; */
  //console.log(text1, root1, text2, root2);
  //Создаем див
  let divChoice = document.createElement("div");
  divChoice.classList.add("divChoice");
  document.body.appendChild(divChoice);
  //добавляем кнопки
  divChoice.innerHTML = `
  <button class="choiceBtn btn1">${text1}</button>
  <button class="choiceBtn btn2">${text2}</button>
  `;
  //добавляем слушатель
  divChoice.children[0].addEventListener("click", () => Choice(root1));
  divChoice.children[1].addEventListener("click", () => Choice(root2));
  //для футера добавляем скрытие
  Footer.classList.toggle("hidden");
}

function Choice(root) {
  if (typeof root === "string") {
    let divChoice = document.querySelector(".divChoice");
    divChoice.parentNode.removeChild(divChoice);
    Footer.classList.toggle("hidden");
    //Добавим wrapper, чтобы нельзя было кликнуть, пока строка бежит
    let divWrapper = document.createElement("div");
    divWrapper.classList.add("divWrapper");
    document.body.appendChild(divWrapper);
    setTimeout(() => {
      divWrapper.parentNode.removeChild(divWrapper);
    }, TEMP.length * SPEEDTEXT);
    // Бегущая строка
    let str = root + ` `,
      i = 0,
      isTag,
      text;
    (function type() {
      text = str.slice(0, ++i);
      if (text === str) return;

      document.getElementById("typewriter").innerHTML = text;

      var char = text.slice(-1);
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;

      if (isTag) return type();
      setTimeout(type, SPEEDTEXT);
    })();
    // Phrase.innerHTML = root;
  } else {
    //Минирут или новая ветвь
    if (root[0].startsWith("MINI")) {
      mainArr.splice.apply(mainArr, [INDEX, 0].concat(root));
      let divChoice = document.querySelector(".divChoice");
      divChoice.parentNode.removeChild(divChoice);
      Footer.classList.toggle("hidden");
      INDEX++;
      Game();
    } else {
      mainArr = [];
      INDEX = 0;
      mainArr = [...root];
      let divChoice = document.querySelector(".divChoice");
      divChoice.parentNode.removeChild(divChoice);
      Footer.classList.toggle("hidden");
      Game();
    }
  }
}

//
//При клике итерируется массив
//
DivButton.addEventListener("click", () => {
  //Действия при первом клике
  if (STARTFLAG) {
    STARTFLAG = false;
    let DescriptionDiv = document.querySelector(".description");
    DescriptionDiv.classList.add("hidden");
    //кнопки меню
    NewGameBtn.classList.add("hidden");
    LoadGameBtn.classList.add("hidden");
    IconVie.classList.remove("hidden");
    IconSave.classList.remove("hidden");
  }

  //если END
  if (mainArr[INDEX] == "END") {
    console.log("Конец");
    return;
  }

  let tempArr = mainArr[INDEX];
  if (tempArr[0] == "ROOT") {
    INDEX = 1;
    mainArr = [];
    mainArr = [...tempArr];
    //при новом руте - очищаем главный массив, заполняем его новым
  }
  Game();
});

function Game() {
  TEMP = mainArr[INDEX];
  INDEX++;
  try {
    if (!TEMP.startsWith("FN")) {
      //Добавим wrapper, чтобы нельзя было кликнуть, пока строка бежит
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("divWrapper");
      document.body.appendChild(divWrapper);
      setTimeout(() => {
        divWrapper.parentNode.removeChild(divWrapper);
      }, TEMP.length * SPEEDTEXT);
      // Бегущая строка
      let str = TEMP + ` `,
        i = 0,
        isTag,
        text;
      (function type() {
        text = str.slice(0, ++i);
        if (text === str) return;

        document.getElementById("typewriter").innerHTML = text;

        var char = text.slice(-1);
        if (char === "<") isTag = true;
        if (char === ">") isTag = false;

        if (isTag) return type();
        setTimeout(type, SPEEDTEXT);
      })();
      // Phrase.innerHTML = TEMP;
    } else {
      //вызываем функцию
      let param = mainArr[INDEX];
      INDEX++;
      evaluateFunction(TEMP, param);
      // ставим новую строку
      Game();
    }
  } catch (error) {}
}

//Функция сохранения
IconSave.addEventListener("click", () => {
  //Стили
  IconSave.classList.toggle("btnClick");
  setTimeout(() => {
    IconSave.classList.toggle("btnClick");
  }, 150);
  // Преобразуем массив в строку JSON и в localStorage
  let arrayString = JSON.stringify(mainArr);
  localStorage.setItem("VNmySave", arrayString);
  localStorage.setItem("VNIndexSave", INDEX - 1);
  //
  TempToLocalStorage = JSON.stringify(TempToLocalStorage);
  localStorage.setItem("VNother", TempToLocalStorage);
  //
  spriteArrTolocalStorage = JSON.stringify(spriteArrTolocalStorage);
  localStorage.setItem("VNSprite", spriteArrTolocalStorage);
});

//Кнопка новой игры
NewGameBtn.addEventListener("click", () => {
  // Получаем строку JSON из localStorage
  if (localStorage.getItem("VNIndexSave") == null) {
  } else {
    localStorage.removeItem("VNmySave");
    localStorage.removeItem("VNIndexSave");
    localStorage.removeItem("VNother");
    localStorage.removeItem("VNSprite");
  }
  //старт
  Game();
  NewGameBtn.classList.add("hidden");
  LoadGameBtn.classList.add("hidden");
  let DescriptionDiv = document.querySelector(".description");
  DescriptionDiv.classList.add("hidden");
  IconVie.classList.remove("hidden");
  IconSave.classList.remove("hidden");
});

//Кнопка последнего сохранения
LoadGameBtn.addEventListener("click", () => {
  // Получаем строку JSON из localStorage
  if (localStorage.getItem("VNIndexSave") == null) {
    LoadGameBtn.innerHTML = "У вас нет сохранений!";
    setTimeout(() => {
      LoadGameBtn.innerHTML = "Последнее сохранение";
    }, 1300);
  } else {
    let retrievedArrayString = localStorage.getItem("VNmySave");
    let retrievedArray = JSON.parse(retrievedArrayString);
    mainArr = [];
    mainArr = retrievedArray;
    INDEX = +localStorage.getItem("VNIndexSave");
    //Другие данные
    let otherData = localStorage.getItem("VNother");
    otherData = JSON.parse(otherData);
    LoadMedia(otherData);
    //спрайты
    let SpriteFromLocalStorage = localStorage.getItem("VNSprite");
    SpriteFromLocalStorage = JSON.parse(SpriteFromLocalStorage);
    LoadSprite(SpriteFromLocalStorage);
    //
    //старт
    Game();
    NewGameBtn.classList.add("hidden");
    LoadGameBtn.classList.add("hidden");
    let DescriptionDiv = document.querySelector(".description");
    DescriptionDiv.classList.add("hidden");
    IconVie.classList.remove("hidden");
    IconSave.classList.remove("hidden");
  }
});

//Функция востанавливающая Медиа после загрузки сохранения
function LoadMedia(otherData) {
  //
  try {
    FNchangeName(otherData.color);
    FNchangeBackgroundImage(otherData.background);
    FNmusic(otherData.music);
  } catch (error) {}
  //
  TempToLocalStorage.color = otherData.color;
  TempToLocalStorage.background = otherData.background;
  TempToLocalStorage.music = otherData.music;
}
//Функция востанавливающая Спрайты после загрузки сохранения
function LoadSprite(SpriteArr) {
  for (let i = 0; i < SpriteArr.length; i++) {
    FNputSprait(SpriteArr[i]);
  }
}

//слайдер скорости текста
let slider = document.getElementById("slider");
let displaySlider = document.getElementById("display");
slider.addEventListener("input", function () {
  let value = parseInt(slider.value);
  displaySlider.textContent = `Быстро--${value}--Медленно`;
  SPEEDTEXT = value;
  localStorage.setItem("VNSpeedText", SPEEDTEXT);
});

if (localStorage.getItem("VNSpeedText") == null) {
  localStorage.setItem("VNSpeedText", SPEEDTEXT);
} else {
  SPEEDTEXT = +localStorage.getItem("VNSpeedText");
  slider.value = SPEEDTEXT;
}
//
//
//
//
//
/* let mainArr = [
  "FNchangeBackgroundImage",
  fon,
  "Очень длинная строка для теста. Очень длинная строка для теста. Очень длинная строка для теста. Очень длинная строка для теста.Очень длинная строка для теста. Очень длинная строка для теста.Очень длинная строка для теста. Очень длинная строка для теста.Очень длинная строка для теста. Очень длинная строка для теста.Очень длинная строка для теста. Очень длинная строка для теста.Очень длинная строка для теста. Очень длинная строка КОНЕЦ!",
  "Обычная строка Обычная строка Обычная строка Обычная строка Обычная строка Обычная строка Обычная строка Обычная строка ",
  "Обычная строка",
  "...",
];
 */
//
//
//
//
//
//
//Тестовый рут
let mainArr = [...rootDemoStart];

//панель монолога функция
function FNmonologPanel(MonologArr) {
  //скрываем футер, ставим панель
  Footer.classList.toggle("hidden");
  let MonologPanel = document.createElement("div");
  MonologPanel.classList.add("monologPanel");
  document.body.appendChild(MonologPanel);
  let TextPanel = document.createElement("div");
  TextPanel.classList.add("textPanel");
  MonologPanel.appendChild(TextPanel);
  //Добавляем слушатель для monologPanel
  (function () {
    let count = -1;
    MonologPanel.addEventListener("click", function typewriter() {
      count++;
      //ЕСЛИ BREAK, то выходим из панели
      if (MonologArr[count] == "BREAK") {
        MonologPanel.parentNode.removeChild(MonologPanel);
        Footer.classList.toggle("hidden");
      }
      //ЕСЛИ NEXT, то очищаем панель
      if (MonologArr[count] == "NEXT") {
        TextPanel.replaceChildren();
        count++;
      }
      //
      let str = MonologArr[count] + " ",
        i = 0,
        isTag,
        text;
      //Добавим wrapper, чтобы нельзя было кликнуть, пока строка бежит
      let divWrapper = document.createElement("div");
      divWrapper.classList.add("divWrapper");
      document.body.appendChild(divWrapper);
      let k = 2.5;
      if (SPEEDTEXT < 5) k = 5;
      setTimeout(() => {
        divWrapper.parentNode.removeChild(divWrapper);
      }, str.length * (SPEEDTEXT + k));
      //
      let TextP = document.createElement("p");
      TextP.classList.add("textp");
      TextPanel.appendChild(TextP);
      (function type() {
        text = str.slice(0, ++i);
        if (text === str) return;

        TextP.textContent = text;

        var char = text.slice(-1);
        if (char === "<") isTag = true;
        if (char === ">") isTag = false;

        if (isTag) return type();
        setTimeout(type, SPEEDTEXT);
      })();
    });
    MonologPanel.click();
  })();
}
