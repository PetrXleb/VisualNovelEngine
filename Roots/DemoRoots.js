"use string";

let ROOTDemoFinal = [
  "ROOT",
  "FNmusic",
  music1,
  "FNchangeName",
  Nikolai,
  "FNchangeBackgroundImage",
  NikolaiHome,
  "FNputSprait",
  [Himicy, 50, 30, 0, 900], ///size //top //left
  "Это все механики, которые пока доступны",
  "Подробности ищи в <u>DemoRoots.js</u>",
  "Там можно ознакомиться с этой тестовой новеллой",
  "Спасибо за внимание!",
  "END",
];

let rootDemoSquare = [
  "FNchangeName",
  thoughts,
  "...",
  "~Я заметил в углу Лену, как обычно читавшую книгу~",
  "FNputSprait",
  [sprait, 30, 0, 50, 100], ///size //top //left,
  "FNchangeName",
  nameLena,
  "Привет Семён",
  "Разве ты не должен сейчас помогать Ольге Дмитриевне в столовой?",
  "FNchangeName",
  autor,
  "И так далее...",
  ROOTDemoFinal,
];

let rootDemoScena = [
  "FNchangeBackgroundImage",
  sceneFon,
  "FNchangeName",
  thoughts,
  "...",
  "~К моему удивлению, я обнаружил Лену, тренирующую тенисные подачи~",
  "FNchangeName",
  nameLena,
  "FNputSprait",
  [lenaSport, 15, 30, 50, 200], ///size //top //left //delay
  "Ой, привет. А ты наверное Алису ищешь?",
  "FNchangeName",
  you,
  "Да нет, просто решил прогуляться",
  "FNchangeName",
  thoughts,
  "~Я не стал уточнять у неё, почему она выбрала сцену, в качестве места для занятия тенисом~",
  "FNchangeName",
  autor,
  "И так далее...",
  ROOTDemoFinal,
];

let rootDemoStart = [
  "FNchangeBackgroundImage",
  fon1,
  "FNchangeName",
  autor,
  "Демо показ движка",
  "Лучше смотреть на пк или ноутбуке...",
  "Если телефон, то обязательно с горизонтально повёрнутым полным экраном. Чтобы войти-выйти с полного экрана, нажмите тремя пальцами по любому месту",
  "Весь текст плавно появляется, пародируя печатную машинку",
  "В меню есть слайдер, чтобы изменить скорость появления текста",
  "Сейчас вы видети один фон, через клик будет другой",
  "FNchangeBackgroundImage",
  fon,
  "...",
  "Справа на панеле есть значёк глаза, с помощью него можно посмотреть фон полностью",
  "Рядом с ним значёк сохранения. Можете протестировать хоть сейчас. Нажмите значёк и обновите страницу. Потом нажмите на кнопку загрузки сохранения. Должнен быть точно этот же фон и текст",
  "Новая игра позволяет сбросить последнее сохранение и начать прохождение заново",
  'Как и в html тут можно использовать теги для показа текста <b>жирным</b>, <i>курсивным</i>, <s>перечёркнутым</s>, <b style="color:red">цветным</b> и так далее',
  "Сейчас сменю имя",
  "FNchangeName",
  Slavya,
  "Теперь добавим спрайт Слави",
  "FNputSprait",
  [Slavya_spait1, 30, 0, 50, 200], ///size //top //left
  "Привет, ты тут новенький?",
  "FNchangeName",
  autor,
  "Сейчас подвину спрайт влево и приближу его",
  "FNdeleteSprait",
  Slavya_spait1,
  "FNputSprait",
  [Slavya_spait1, 40, 0, 30, 0], ///size //top //left
  "Теперь поменяем эмоцию",
  "FNdeleteSprait",
  Slavya_spait1,
  "FNputSprait",
  [Slavya_spait2, 40, 0, 30, 0], ///size //top //left
  "Теперь поиграемся с музыкой",
  "Сейчас начнется песня",
  "FNmusic",
  music2,
  "...",
  "Через клик песня перестанет играть",
  "FNmusic",
  stop,
  "...",
  "Также можно вставлять звуковые эффекты. Например как этот",
  "FNsound",
  sound1,
  "Шелест травы",
  "Звуковые эффекты также можно останавливать",
  "FNdeleteSprait",
  Slavya_spait2,
  "...",
  "Теперь перейдем к выборам действий",
  "FNchangeBackgroundImage",
  fon2,
  "Сейчас будет выбор, который по сути ничего не несёт, кроме лишней графомании",
  "FNchangeName",
  you,
  "FNdoChoice",
  "Съесть яблоко",
  [
    "MINI",
    "Была не была",
    "Обед всё равно ещё придётся подождать",
    "FNsound",
    applebite,
  ],
  "Не есть",
  "Да в принципе и не голодный я",
  "...",
  "FNchangeBackgroundImage",
  domicOlgi,
  "FNchangeName",
  autor,
  "Ещё один немаловажный компонент в визуальных новеллах - панель монолога",
  "Эта панель необходима, когда нужно описать большой объем мыслей главного героя",
  "В качестве примера взята статья с вики. Вот как выглядит панель монолога тут",
  "FNmonologPanel",
  [
    "\u00a0Абзац — малоисследованный компонент литературной формы, имеющий композиционное, сюжетно-тематическое, ритмическое значение и связанный со стилем автора.",
    "Характерны, например, краткие абзацы в импрессионистической прозе — симптомы раздробленности, афористичности мысли; или например возвращение к длинному абзацу в несколько страниц у Марселя Пруста.",
    "\u00a0Профессиональное отношение к висячим строкам отрицательно, но полного запрета на висячие строки нет — они допустимы в газетной вёрстке, в оперативной полиграфии и в тому подобных случаях при условии, что верхняя висячая строка не короче ⅔ формата набора (то есть ширины текста), а строка перед нижней висячей строкой также не меньше ⅔ формата набора. То есть, висячая строка не должна быть слишком короткой.",
    `\u00a0Для выделения абзаца его, помимо новой строки, печатают с красной строки, то есть отделяют вертикальным отступом от соседних абзацев и/или делают абзацный отступ. Выражение «красная строка» происходит из Древнего Египта.`,
    "NEXT",
    "\u00a0Во многих опубликованных книгах используется устройство для дополнительного разделения определенных абзацев при смене места действия или времени.",
    "\u00a0 Этот дополнительный пробел, особенно когда он встречается одновременно в разрыве страницы или раздела, может содержать специальный символ, известный как динкус, флерон или стилистическая приметка.",
    "\u00a0Составление четких, связных абзацев является предметом значительных стилистических дебатов. Форма варьируется в зависимости от разных типов письма. Например, в газетах, научных журналах и художественных эссе существуют несколько иные соглашения о размещении разрывов между абзацами.",
    "BREAK",
  ],
  "Конец монолога...",
  "FNchangeBackgroundImage",
  sqfon,
  "Теперь второй тип выбора",
  "Когда при выборе меняется ход повествования",
  "FNchangeName",
  you,
  "FNdoChoice",
  "Пойти на сцену",
  rootDemoScena,
  "Остаться на площади",
  rootDemoSquare,
  "Этот текст уже никто не прочитает (кроме вас - кодеров)",
];
