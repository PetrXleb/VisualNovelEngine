"use strict";
const DivButton = document.querySelector(".divButton");
const Phrase = document.querySelector(".phrase");
const Name = document.querySelector(".name");
const SpriteDiv = document.querySelector(".sprite");
const DivBackground = document.querySelector(".divBackground");
const Footer = document.querySelector(".footer");
const IconVie = document.querySelector(".fa-eye");
const IconSave = document.querySelector(".fa-folder");

let STARTFLAG = true;
let INDEX = 0;
let TEMP;
let MUSIC;
let SOUND;

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
}

//смена имени
function FNchangeName(name) {
  Name.innerHTML = name.name;
  Name.style.color = name.color;
}

//ставим спрайт
function FNputSprait(SpraitArr) {
  let sprait = SpraitArr[0];
  let size = SpraitArr[1];
  let top = SpraitArr[2];
  let left = SpraitArr[3];
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
  //добавляем спец класс, чтобы потом удалять спрайты
  let classDelete = sprait.replace(/[.:/]/g, "");
  divContainer.classList.add(classDelete);
  // Добавление созданного элемента в <body>
  document.body.appendChild(divContainer);
}

//удалить спрайт
function FNdeleteSprait(Sprait) {
  let classDelete = Sprait.replace(/[.:/]/g, "");
  let SpraitToDelete = document.querySelector(`.${classDelete}`);
  SpraitToDelete.parentNode.removeChild(SpraitToDelete);
}

//ставим удаляем музыку
function FNmusic(url) {
  try {
    MUSIC.pause();
    if (typeof url == "function") return;
  } catch (error) {}
  if (url != "stop") {
    MUSIC = new Audio(url);
    MUSIC.loop = true;
    MUSIC.play();
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
    }, TEMP.length * 8);
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
      setTimeout(type, 8);
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
  //если END
  if (mainArr[INDEX] == "END") {
    console.log("Конец");
    return;
  }
  //описание в начале
  if (STARTFLAG) {
    STARTFLAG = false;
    let DescriptionDiv = document.querySelector(".description");
    DescriptionDiv.classList.add("hidden");
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
      }, TEMP.length * 8);
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
        setTimeout(type, 8);
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

//
//
//Тестовый рутlet
//
let mainArr = [...rootDemoStart];
//
//
//mainArr = [...ROOTDemoFinal];

//
//
//

//Функция сохранения
IconSave.addEventListener("click", () => {
  console.log("Функция сохранения");
  alert("Функция сохранения ещё не готова!");
});
