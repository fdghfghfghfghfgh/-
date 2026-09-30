const board = document.getElementById("board");

/* =========================================================
   КОНСТАНТЫ
   ========================================================= */
const TEAM_COLORS = [
    { defaultName: "Красные" },
    { defaultName: "Синие" }
];

const GAME_POOL = [
    "Длина волны", "Угадай памятник", "Продолжи закон", "Анкеты знакомств",
    "Актуальность темы", "Фотомонтаж", "Что было дальше", "Типы любви", "Шизоистория", "Эмоциональные матрицы"
];

const THEME_POOL = [
    { left: "Российская империя", right: "Советский союз" },
    { left: "Монархия",           right: "Республика" },
    { left: "Рим",               right: "Греция" },
    { left: "Консерваторы",       right: "Либералы" }
];

const MONUMENT_POOL = [
    { image: "images/monument-1.png", title: "Памятник Николаю II в Крыму", question: "Чему посвящен этот памятник?", answer: "Памятник был установлен в память о расстреле царской семьи" },
    { image: "images/monument-2.png", title: "АЛЁНКА", question: "18 декабря 2020 года в Воронежской области в городе Новоронеж был установлен памятник. Предположите, в честь какого события он мог быть установлен.", answer: "Памятник был установлен в честь 250-летия со дня основания села Новая Алёновка" },
    { image: "images/monument-2.png", title: "АЛЁНКА", question: "18 декабря 2020 года в Воронежской области в городе Новоронеж был установлен памятник. Предположите, в честь какого события он мог быть установлен.", answer: "Памятник был установлен в честь 250-летия со дня основания села Новая Алёновка" },
    { image: "images/monument-2.png", title: "АЛЁНКА", question: "18 декабря 2020 года в Воронежской области в городе Новоронеж был установлен памятник. Предположите, в честь какого события он мог быть установлен.", answer: "Памятник был установлен в честь 250-летия со дня основания села Новая Алёновка" }
];

const LAW_POOL = [
    { start: "На территории коммуны Кюньо запрещено …", answer: "умирать", note: "Муниципальный указ от 16 ноября 2007" },
    { start: "Можно заключить брак после …", answer: "смерти", note: "ст. 171 Гражданского кодекса Франции" },
    { start: "В коммуне Шатонёф-дю-Пап запрещены полёты и приземления …", answer: "НЛО", note: "Постановление от 25 октября 1954, коммуна Шатонёф-дю-Пап" },
    { start: "В Гранвиле запрещено выгуливать … на пляже", answer: "слонов", note: "Муниципальный закон 2009 г." },
    { start: "Во французском городе Бриолле запрещено жить …", answer: "комарам", note: "Муниципальный декрет Сент-Жюст-Сент-Рамбер от 3 сентября 2026" },
    { start: "В школах детям запрещено подавать в кафетериях …", answer: "кетчуп", note: "Декрет от 30 сентября 2011 о питательном качестве школьных блюд" }
];

const PROFILE_POOL = [
    { author: "Николай", age: 58, city: "Санкт-Петербург", text: `Я высокого роста, из богатой семьи, воспитанный и образованный. Я люблю Россию и все русское, поэтому если ты хочешь часто ездить за границу, то это не ко мне, да и в целом меня там не любят. Сторонник здорового образа жизни. Отзывчивый, один раз выплатил все долги за своего друга, так что и тебя смогу содержать. Ищу спутницу жизни, которая будет рядом несмотря ни на что, даже если против меня будет весь мир. Мне не нужна инициативная женщина, которая вечно будет указывать что мне делать, я сторонник отношений, где мужчина главный. Я не буду рядом 24/7, так как много работаю, но я обеспечу тебе комфортную жизнь, где у тебя будет все, что ты захочешь.`, hints: ["обожаю все, что связано с инженерией", "люблю железные дороги", "имею прозвище \"Палкин\""], answer: "Николай II" },
    { author: "Сергей", age: 65, city: "Санкт-Петербург", text: `Я из тех, кто всю жизнь провёл в движении, благодаря этому построил шикарную карьеру, даже был министром. Я обожаю все, что связано с железными дорогами: моя первая работа была непосредственно на ж/д путях, а сейчас я курирую постройку самой длинной магистрали России. В свободное время я люблю посещать театр. Иногда позволяю себе резкие выражения — особенно в адрес праздного дворянства. Ищу женщину, которая сможет выдержать поток моих идей и будет поддержать меня в любых начинаниях. Хочу, чтобы мы могли говорить часами и учили друг другу новому. Как только завершу все свои дела, обязательно свожу тебя в Сибирь, уверен ты там ни разу не была.`, hints: ["часто гуляю с револьвером, так как опасаюсь покушений", "имею статус графа", "ввел золотой стандарт в России"], answer: "Сергей Витте" },
    { author: "Эрнест", age: 61, city: "Куба / США / Франция", text: `Иногда тусуюсь в США, иногда во Франции, чаще на Кубе. Плюс минус 35 лет сочиняю тексты. Иногда пишу о войне, иногда про море – получается вроде неплохо. Люблю корриду, сафари, марлинов. Был женат четыре раза – не ред флаг, а лонгитюдное исследование. Пью, потому что так проще молчать. Ненавижу запятые, лишние слова и разговоры о чувствах. Ищу ту, что не будет устраивать сцены, когда я уезжаю на полгода на рыбалку, войну или в Испанию. Важно, чтоб ты понимала моё ощущение вечной слежки за мной и была готова к моей эмоциональной нестабильности.`, hints: ["обожаю кошек — на Кубе у меня их жило с полсотни", "был номинирован на Нобелевскую премию по литературе", "напишу самый короткий рассказ, способный растрогать любого…"], answer: "Эрнест Хемингуэй" },
    { author: "Зиночка", age: 76, city: "Париж", text: `Вечная «декадентская мадонна», потому что в 76 лет я всё ещё язвлю, эпатирую и ношу мужские костюмы. Мои интересы – символизм, поиск недостижимого и коллекционирование обручальных колец от поклонников. Ношу их на шее как трофей – не потому что жестокая, а потому что это смешно. Самое любимое, конечно же, критика. На Родине ко мне на чай часто заходили Сашенька, ну который Блок, Мандельштам и другие ребятки нашего особого окружения. Обсуждали с ними насущные вопросы веры, церкви, смысла жизни и социальной справедливости. Ты мне определенно подходишь, если будешь готов поддерживать мою игру в «сатанессу» и споры с Богом. Ты должен уметь молчать, пока я пишу злые статьи под мужским именем. Если ты умеешь читать Бодлера, пить чай в доме Мурузи и не спрашивать, почему у нас нет детей, то – велкам.`, hints: ["мою кошку зовут Кошшшка", "талантлива с рождения, начала писать работы с семи лет", "имена Антон Крайний и Лев Пущин вам о чем-нибудь говорят?"], answer: "Зинаида Гиппиус" },
    { author: "Михаил", age: 67, city: "Санкт-Петербург", text: `Сорок лет в профессии, занимаюсь логистикой и решением вопросов своих, иногда чужих. Предпочитаю работать в своём темпе, чтобы никто не доставал лишними вопросами. Люблю почитать, вкусно поесть — особенно, французскую кухню — и ходить в театр, правда, не всегда на него есть время. Ищу женщину, которая не требует всего и сразу. Мне не нужны интрижки на месяц, вся эта суета, трата лишних нервов из-за моложавых выскочек. Если ты способна переждать зиму, насладиться тишиной и вкусной едой — нам будет о чем поговорить.`, hints: ["по-французски говорю лучше самих французов, но это не значит, что я их люблю", "я не красавец: дважды ловил пулю в голову, так что один глаз смотрит прямиком в историческую перспективу", "люблю огни Москвы"], answer: "Михаил Кутузов" },
    { author: "Илья", age: 86, city: "Санкт-Петербург", text: `Я творческий человек, поэтому мой дом заставлен мольбертами. Трудоголик и перфекционист, часто сижу за работой сутками. Экстраверт, в моем доме всегда много гостей, я люблю внимание к своей персоне. Кроме того, я часто в разъездах, так как ищу вдохновение для новых картин. Ищу женщину современных взглядов, для которой на первом месте стоит саморазвитие, а не домашний уют и дети. Хочется видеть рядом с собой образованную яркую леди, которая будет интересоваться искусством и восхищаться мной, а также помогать мне в работе. Мы будем часто посещать светские вечера, читать друг другу стихи и жить у берега Финского залива.`, hints: ["своим первым учителем считаю Ивана Крамского", "одну мою работу изуродовал вандал, из-за которого ее пришлось восстанавливать", "написал известную картину \"Бурлаки на Волге\""], answer: "Илья Репин" }
];

const TOPIC_POOL = [
    { image: "images/aktualnost1.png" },
    { image: "images/aktualnost2.png" }
];

const POSTER_POOL = [
    { image: "images/poster-1.png", title: "Плакат 1" },
    { image: "images/poster-2.png", title: "Плакат 2" },
    { image: "images/poster-3.png", title: "Плакат 3" }
];

const FILM_POOL = [
    { title: "Тася", plot: "Невинная девушка Тася растёт в доме родителей как цветок в оранжерее. Мать Таси стремится выдать дочь за богатого земского начальника Элпидина: она сама вышла замуж по любви и натерпелась горя от измен мужа.", questions: ["Выйдет ли она вообще замуж?", "Выйдет и полюбит мужа?", "Выйдет замуж и всё равно будет несчастна?"], answer: "Героиня кончает жизнь самоубийством: вышла замуж за земского начальника, но не смогла жить в браке без любви." },
    { title: "Женщины завтрашнего дня", plot: "Главная героиня фильма — известная на всю столицу акушерка Анна Бецкая. У неё много работы, и, чувствуя себя оставленным, её муж заводит роман с официанткой Юзей.", questions: ["Простит ли Анна мужа?", "Что сделает Юзя, когда узнает правду об Анне?", "Кто из троих выйдет из этой истории живым?"], answer: "Юзя беременеет, и её отвозят оперировать к Анне как к лучшему врачу. Анна разоблачает мужа — и он кончает жизнь самоубийством." },
    { title: "Сумерки женской души", plot: "Князь Дольский не может простить молодую жену Веру: она была обесчещена и рассказала об этом лишь после венчания. Вера изгнана из дома, она уезжает за границу и становится известной певицей. Князь же раскаивается в своём поступке.", questions: ["Вернётся ли Вера к князю?", "Сможет ли Дольский вымолить прощение?", "Чем закончится его раскаяние?"], answer: "Вера отвергает Дольского. Князь, не найдя утешения в кутежах, убивает себя." },
    { title: "Умирающий лебедь", plot: "У Гизеллы разбито сердце: её возлюбленный Виктор предпочёл другую. Через несколько лет Гизелла становится известной балериной, а художник Глинский пишет её портрет в виде умирающего лебедя. И вот — новая встреча с Виктором: он любит Гизеллу как когда-то!", questions: ["Простят ли они друг друга?", "Что сделает художник Глинский, увидев счастливую Гизеллу?", "Чья любовь победит — Виктора или Глинского?"], answer: "Художник Глинский на очередном сеансе сочтёт, что после счастливого воссоединения с Виктором Гизелла недостаточно мертва для его картины, и задушит её." },
    { title: "Малютка Элли", plot: "В городе N убита девочка Элли. Её сестра Клара раздавлена горем. Мэр города Фред Нортон берёт дело под личный контроль: он любит Клару.", questions: ["Найдёт ли мэр убийцу?", "Что сделает Клара, узнав правду?", "Может ли она простить того, кто убил её сестру?"], answer: "Убийцей оказался сам мэр. Узнав правду, Клара готова сдать Фреда в полицию, но внезапно понимает, что прощает его: за время расследования она успела выйти за него замуж." },
    { title: "Горничную Дженни", plot: "Дженни, девушка из обедневшей аристократической семьи, выдаёт себя за горничную и поступает на службу в дом баронессы Анжер. Она знакомится с молодым авиатором Жоржем Анжером — сыном баронессы. Герои чувствуют симпатию друг к другу.", questions: ["Раскроется ли её обман?", "Как отреагирует баронесса?", "Соединятся ли влюблённые?"], answer: "Хэппи-энд: герои женятся и счастливы." }
];

const LOVE_POOL = [
    { image: "images/love-1.png",  couple: "Лиля Брик и Владимир Маяковский",       type: "Одержимость" },
    { image: "images/love-2.png",  couple: "Генрих VIII и Анна Болейн",              type: "Одержимость" },
    { image: "images/love-3.png",  couple: "Софья Андреевна и Лев Толстой",          type: "Самоотверженность" },
    { image: "images/love-4.png",  couple: "Мария и Сергей Волконские",              type: "Самоотверженность" },
    { image: "images/love-5.png",  couple: "Мария Склодовская-Кюри и Пьер Кюри",     type: "Единство душ" },
    { image: "images/love-6.png",  couple: "Дмитрий Мережковский и Зинаида Гиппиус", type: "Единство душ" },
    { image: "images/love-7.png",  couple: "Франческо Петрарка и Лаура",             type: "Трансцендентный опыт" },
    { image: "images/love-8.png",  couple: "Пьер Абеляр и Элоиза",                   type: "Трансцендентный опыт" },
    { image: "images/love-9.png",  couple: "Марк Антоний и Клеопатра",               type: "Ненасытность" },
    { image: "images/love-10.png", couple: "Наполеон Бонапарт и Жозефина",           type: "Ненасытность" }
];

/* =========================================================
   «ШИЗОИСТОРИЯ»
   ========================================================= */
const SHIZO_DIRECTION_IMAGES = [
    "images/shizo-direction-1.png",
    "images/shizo-direction-2.png"
];

const SHIZO_ROUND_IMAGES = [
    "images/shizo-round-1.png",
    "images/shizo-round-2.png",
    "images/shizo-round-3.png"
];

const EMOTION_GROUPS = [
    "Рыцари",
    "Декабристы",
    "Народники",
    "Казаки",
    "Самураи",
    "Пираты",
    "Пуритане",
    "Старообрядцы",
    "Дворяне"
];

const EMOTION_EXAMPLE = `Эмоциональная матрица российских суфражисток в XXI веке формировалась бы под влиянием сериалов «Миссис Америка» и «Рассказ служанки», где женщины объединяются против системы, отрицающей их субъектность, а также фильма «По половому признаку», где героиня пытается пробиться на высокую рабочую должность в патриархальном мире. Их решимость и солидарность подпитывались бы музыкой женщин-исполнительниц, которые поднимают в своём творчестве важные для женщин проблемы, — например, они могли бы слушать певицу Манижу. В литературе опорой стали бы «Конец свободной эпохи» Анастасии Полозовой — живой сборник голосов российского феминизма, рассказывающий сложную и нелинейную историю женского движения. В итоге матрица предписывала бы коллективное сопротивление, гнев как топливо, готовность к жертве ради будущих поколений и отказ видеть в патриархате естественный порядок вещей.`;

const EMOTION_INTRO = `Эмоциональные матрицы — это понятие историка культуры Андрея Зорина, обозначающее культурно заданные образцы и сценарии того, как человек должен чувствовать, интерпретировать и выражать эмоции в ту или иную эпоху. Они не являются биологическими реакциями, а представляют собой «программы» чувствования, которые формируются культурой. Эмоциональные матрицы могут меняться в течение жизни — в зависимости от того, меняет ли человек круг своего общения, — так как матрица скорее существует для определённой группы, нежели для отдельной личности.`;

const MAX_HISTORY = 50;

/* =========================================================
   СОСТОЯНИЕ
   ========================================================= */
let teams = [];
let currentTeamIndex = 0;
let playerPosition = 12;
let completedCells = [];
let gamesPlayed = 0;
let gameSequence = [];
let themeSequence = [];
let currentThemeIndex = 0;
let monumentSequence = [];
let currentMonumentIndex = 0;
let lawSequence = [];
let currentLawIndex = 0;
let profileSequence = [];
let currentProfileIndex = 0;
let history = [];

/* =========================================================
   УТИЛИТЫ
   ========================================================= */
const $   = sel => document.querySelector(sel);
const $$  = sel => document.querySelectorAll(sel);
const isConfirmKey = e => e.key === "Enter" || e.key === " " || e.code === "Space";
const isUndoKey    = e =>
    e.key === "Backspace" ||
    e.key === "r" || e.key === "R" || e.key === "к" || e.key === "К" ||
    e.key === "z" || e.key === "Z" || e.key === "я" || e.key === "Я";

const teamColorClass = i => `team-color-${i}`;

const teamHTML = t => `
    <span class="team-chip-dot"></span>
    <span class="team-chip-name">${t.name}</span>
    <span class="team-chip-score">${t.score}</span>`;

function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function onConfirm(overlay, callback) {
    function handler(event) {
        if (!document.body.contains(overlay)) {
            document.removeEventListener("keydown", handler);
            return;
        }
        if (event.repeat) return;
        if (isConfirmKey(event)) {
            event.preventDefault();
            document.removeEventListener("keydown", handler);
            callback();
        }
    }
    document.addEventListener("keydown", handler);
    return handler;
}

function animateAngle(setter, getter, target, duration, cb, guard) {
    const start = getter();
    const t0 = performance.now();
    let rafId;
    function frame(now) {
        if (guard && !guard()) return;
        const t = Math.min(1, (now - t0) / duration);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        setter(start + (target - start) * eased);
        if (t < 1) rafId = requestAnimationFrame(frame);
        else if (cb) cb();
    }
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
}

/* =========================================================
   ИСТОРИЯ / КОМАНДЫ / ПОЛЕ / КЛЕТКА
   ========================================================= */
function pushHistory() {
    history.push({ playerPosition, completedCells: completedCells.slice(), gamesPlayed, currentTeamIndex, teams: teams.map(t => ({ ...t })) });
    if (history.length > MAX_HISTORY) history.shift();
}
function undo() {
    if ($(".game-overlay") || $(".score-panel") || !history.length) return;
    const prev = history.pop();
    ({ playerPosition, completedCells, gamesPlayed, currentTeamIndex } = prev);
    teams = prev.teams.map(t => ({ ...t }));
    updateTeamsPanel();
    createBoard();
}
const currentTeam = () => teams[currentTeamIndex];
function nextTurn() {
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    updateTeamsPanel();
    createBoard();
}
function updateTeamsPanel() {
    const panel = document.getElementById("teamsPanel");
    if (!panel) return;
    panel.innerHTML = teams.map((t, i) => {
        const classes = ["team-chip", teamColorClass(t.colorIndex)];
        if (i === currentTeamIndex) classes.push("active");
        return `<div class="${classes.join(" ")}">${teamHTML(t)}</div>`;
    }).join("");
}
function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (i === 12) cell.classList.add("start");
        if (completedCells.includes(i)) cell.classList.add("completed");
        if (i === playerPosition) {
            cell.classList.add("player");
            const team = currentTeam();
            if (team) cell.classList.add(teamColorClass(team.colorIndex));
            cell.innerHTML = '<img src="images/begemotik.png" class="player-image" alt="Игрок">';
        } else {
            cell.innerHTML = '<span class="icon icon-star">★</span>';
        }
        board.appendChild(cell);
    }
}
function movePlayer(direction) {
    if ($(".game-overlay") || $(".score-panel")) return;
    const row = Math.floor(playerPosition / 5);
    const col = playerPosition % 5;
    let np = playerPosition;
    if (direction === "up"    && row > 0) np -= 5;
    if (direction === "down"  && row < 4) np += 5;
    if (direction === "left"  && col > 0) np -= 1;
    if (direction === "right" && col < 4) np += 1;
    if (np === playerPosition) return;
    pushHistory();
    playerPosition = np;
    createBoard();
}
function openCurrentCell() {
    if ($(".game-overlay") || $(".score-panel")) return;
    if (playerPosition === 12) return;
    if (completedCells.includes(playerPosition)) return;
    pushHistory();
    if (gamesPlayed < gameSequence.length) {
        const selectedGame = gameSequence[gamesPlayed++];
        if (selectedGame === "Длина волны") startTeamWavelength();
        else if (selectedGame === "Угадай памятник") startMonumentGame();
        else if (selectedGame === "Продолжи закон") startLawGame();
        else if (selectedGame === "Анкеты знакомств") startProfileGame();
        else if (selectedGame === "Актуальность темы") startTopicGame();
        else if (selectedGame === "Фотомонтаж") startPosterGame();
        else if (selectedGame === "Что было дальше") startFilmGame();
        else if (selectedGame === "Типы любви") startLoveGame();
        else if (selectedGame === "Шизоистория") startShizoGame();
        else if (selectedGame === "Эмоциональные матрицы") startEmotionGame();
        else startGame(selectedGame);
    } else {
        gamesPlayed++;
        startVictory();
    }
}
function completeCurrentCell(overlay, skipScore) {
    if (overlay) overlay.remove();
    if (!completedCells.includes(playerPosition)) completedCells.push(playerPosition);
    createBoard();
    skipScore ? nextTurn() : showScoreScreen(nextTurn);
}
function startGame(gameName) {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    overlay.innerHTML = `<div class="game-window"><h1>${gameName}</h1></div>`;
    document.body.appendChild(overlay);
    onConfirm(overlay, () => completeCurrentCell(overlay, false));
}

/* =========================================================
   SVG "ДЛИНА ВОЛНЫ"
   ========================================================= */
function buildWavelengthSVG(suffix) {
    const CX = 300, CY = 300;
    const R_BLUE_OUT = 220, R_BLUE_IN = 205, R_DISC = 222, R_TEETH = 269, R_ZONE = 205, R_NEEDLE = 150;
    const polarPt = (r, deg) => {
        const rad = (180 - deg) * Math.PI / 180;
        return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
    };
    const wedgePath = (r, d1, d2) => {
        const p1 = polarPt(r, d1), p2 = polarPt(r, d2);
        return `M ${CX} ${CY} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
    };
    const teeth = [];
    const STEP_DEG = 10, HALF_DEG = STEP_DEG / 2 * 0.92;
    const height = R_TEETH - R_DISC;
    const halfChord = R_DISC * Math.sin(HALF_DEG * Math.PI / 180);
    const R_ARC = (height * height + halfChord * halfChord) / (2 * height);
    for (let deg = 0; deg < 360; deg += STEP_DEG) {
        const p1 = polarPt(R_DISC, deg - HALF_DEG);
        const p2 = polarPt(R_DISC, deg + HALF_DEG);
        teeth.push(`<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${R_ARC.toFixed(1)} ${R_ARC.toFixed(1)} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z" fill="#faf5ec"/>`);
    }
    const teethSVG = teeth.join("");
    const tc = 90, BH = 5, RO = 18, YO = 32;
    const zonesSVG = [
        { s: tc - YO, e: tc - RO, c: "#F5C842" },
        { s: tc - RO, e: tc - BH, c: "#E74C3C" },
        { s: tc - BH, e: tc + BH, c: "#3B7DD8" },
        { s: tc + BH, e: tc + RO, c: "#E74C3C" },
        { s: tc + RO, e: tc + YO, c: "#F5C842" }
    ].map(z => `<path d="${wedgePath(R_ZONE, z.s, z.e)}" fill="${z.c}"/>`).join("");
    const blueRing = `M ${CX - R_BLUE_OUT} ${CY} A ${R_BLUE_OUT} ${R_BLUE_OUT} 0 0 1 ${CX + R_BLUE_OUT} ${CY} L ${CX + R_BLUE_IN} ${CY} A ${R_BLUE_IN} ${R_BLUE_IN} 0 0 0 ${CX - R_BLUE_IN} ${CY} Z`;
    const shutterPath = `M ${CX - R_BLUE_IN} ${CY} A ${R_BLUE_IN} ${R_BLUE_IN} 0 0 1 ${CX + R_BLUE_IN} ${CY} Z`;
    const handleAnchorX = CX - R_BLUE_IN + 20;
    const handleTipX = CX - R_BLUE_IN - 68;
    const handleSVG = `<line x1="${handleAnchorX}" y1="${CY}" x2="${handleTipX}" y2="${CY}" stroke="#7fd0d8" stroke-width="16" stroke-linecap="round"/><circle cx="${handleTipX}" cy="${CY}" r="8" fill="#7fd0d8"/>`;
    const needleSVG = `<g class="needle" transform="rotate(-90 ${CX} ${CY})"><line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - R_NEEDLE}" stroke="#d32f2f" stroke-width="6" stroke-linecap="round"/></g>`;
    const centerSVG = `<circle cx="${CX}" cy="${CY}" r="12" fill="#c0392b"/><circle cx="${CX}" cy="${CY}" r="4" fill="#7a2225" opacity="0.35"/>`;
    const clipId = "waveClip_" + suffix, downId = "downShadow_" + suffix, teethShadowId = "teethShadow_" + suffix;
    return `
        <svg class="wavelength-svg" viewBox="0 20 620 290" preserveAspectRatio="xMidYMid meet">
            <defs>
                <clipPath id="${clipId}"><rect x="-40" y="-40" width="700" height="${CY + 40}"/></clipPath>
                <filter id="${teethShadowId}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="2.4" flood-color="#0a1a2e" flood-opacity="0.55"/></filter>
                <filter id="${downId}" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#0a1a2e" flood-opacity="0.45"/></filter>
            </defs>
            <g clip-path="url(#${clipId})"><g class="wheel" transform="rotate(0 ${CX} ${CY})"><g filter="url(#${teethShadowId})">${teethSVG}</g><circle cx="${CX}" cy="${CY}" r="${R_DISC}" fill="#faf5ec"/></g></g>
            <g clip-path="url(#${clipId})"><g class="zones-layer" transform="rotate(0 ${CX} ${CY})">${zonesSVG}</g></g>
            <g clip-path="url(#${clipId})"><g class="shutter-body" transform="rotate(0 ${CX} ${CY})" filter="url(#${downId})"><path d="${shutterPath}" fill="#4db8b8"/></g></g>
            <path d="${blueRing}" fill="#1e3a5f" filter="url(#${downId})"/>
            <g class="shutter-handle" transform="rotate(0 ${CX} ${CY})" filter="url(#${downId})">${handleSVG}</g>
            ${needleSVG}${centerSVG}
        </svg>`;
}

/* =========================================================
   КОНТРОЛЛЕР
   ========================================================= */
function makeWavelengthController(overlay, startShutter, startNeedle, startZones = 0) {
    const wheel = overlay.querySelector(".wheel");
    const zonesLayer = overlay.querySelector(".zones-layer");
    const shutterBody = overlay.querySelector(".shutter-body");
    const handle = overlay.querySelector(".shutter-handle");
    const needle = overlay.querySelector(".needle");
    let wheelAngle = 0, shutterAngle = startShutter, needleAngle = startNeedle, zonesAngle = startZones;
    let cancelWheel, cancelShutter, cancelNeedle, cancelZones;
    const setWheel   = d => { wheelAngle = d;   wheel.setAttribute("transform", `rotate(${d} 300 300)`); };
    const setShutter = d => { shutterAngle = d; const t = `rotate(${d} 300 300)`; shutterBody.setAttribute("transform", t); handle.setAttribute("transform", t); };
    const setNeedle  = d => { needleAngle = d;  needle.setAttribute("transform", `rotate(${d - 90} 300 300)`); };
    const setZones   = d => { zonesAngle = d;   zonesLayer.setAttribute("transform", `rotate(${d} 300 300)`); };
    setWheel(0); setShutter(startShutter); setNeedle(startNeedle); setZones(startZones);
    const guard = () => document.body.contains(overlay);
    return {
        get wheel() { return wheelAngle; }, get shutter() { return shutterAngle; },
        get needle() { return needleAngle; }, get zones() { return zonesAngle; },
        setWheel, setShutter, setNeedle, setZones,
        animateWheel(t, d, cb) { if (cancelWheel) cancelWheel(); cancelWheel = animateAngle(setWheel, () => wheelAngle, t, d, cb, guard); },
        animateShutter(t, d, cb) { if (cancelShutter) cancelShutter(); cancelShutter = animateAngle(setShutter, () => shutterAngle, t, d, cb, guard); },
        animateNeedle(t, d, cb) { if (cancelNeedle) cancelNeedle(); cancelNeedle = animateAngle(setNeedle, () => needleAngle, t, d, cb, guard); },
        animateZones(t, d, cb) { if (cancelZones) cancelZones(); cancelZones = animateAngle(setZones, () => zonesAngle, t, d, cb, guard); },
        stopAll() { if (cancelWheel) cancelWheel(); if (cancelShutter) cancelShutter(); if (cancelNeedle) cancelNeedle(); if (cancelZones) cancelZones(); }
    };
}

/* =========================================================
   «ДЛИНА ВОЛНЫ»
   ========================================================= */
function showWavelengthIntro(onStart) {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    overlay.innerHTML = `<div class="game-window wavelength-window"><div class="wavelength-header"><h1>Длина волны</h1></div><div class="wavelength-game"><div class="wavelength-arc-wrap">${buildWavelengthSVG("intro")}</div></div></div>`;
    document.body.appendChild(overlay);
    const ctrl = makeWavelengthController(overlay, 180, 0, 0);
    let stopped = false, timer = null;
    const wait = (ms, cb) => { timer = setTimeout(() => { if (!stopped) cb(); }, ms); };
    function runDemo() {
        if (stopped) return;
        ctrl.setShutter(180); ctrl.setWheel(0); ctrl.setNeedle(0); ctrl.setZones(0);
        wait(900, () => ctrl.animateShutter(0, 1200, () => {
            const zonesOffset = -40 + Math.random() * 80;
            ctrl.animateWheel(ctrl.wheel + 720, 3000, () => {
                ctrl.setZones(zonesOffset);
                ctrl.animateShutter(180, 1200, () => wait(1200, () =>
                    ctrl.animateShutter(0, 1200, () => {
                        const target = 60 + Math.random() * 60;
                        ctrl.animateNeedle(target, 1600, () => wait(300, () =>
                            ctrl.animateShutter(180, 1200, () => wait(1600, () => {
                                ctrl.setWheel(0); ctrl.setNeedle(0); ctrl.setZones(0);
                                wait(500, runDemo);
                            }))
                        ));
                    })
                ));
            });
        }));
    }
    runDemo();
    const keyHandler = onConfirm(overlay, () => {
        stopped = true; clearTimeout(timer); ctrl.stopAll();
        overlay.remove();
        document.removeEventListener("keydown", keyHandler);
        onStart();
    });
}

function showWavelengthResult(hostTeam, guesserTeam, points, onDone) {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    const map = {
        4: { title: "Идеально!",  className: "perfect", image: "images/result-perfect.png" },
        3: { title: "Хорошо!",    className: "great",   image: "images/result-great.png" },
        2: { title: "Нормально!", className: "good",    image: "images/result-good.png" },
        0: { title: "Плохенько!", className: "miss",    image: "images/result-miss.png" }
    };
    const data = map[points] || map[0];
    const rewardHTML = points > 0
        ? `<b class="team-label ${teamColorClass(guesserTeam.colorIndex)}">${guesserTeam.name}</b>: +${points} <b class="team-label ${teamColorClass(hostTeam.colorIndex)}">${hostTeam.name}</b>: +1`
        : `никто не получает очков`;
    overlay.innerHTML = `<div class="game-window"><div class="wavelength-result visible ${data.className}"><img class="result-image" src="${data.image}" alt="${data.title}"><strong>${data.title}</strong><span>${rewardHTML}</span></div></div>`;
    document.body.appendChild(overlay);
    let busy = false;
    onConfirm(overlay, () => { if (busy) return; busy = true; overlay.remove(); onDone(); });
}

function startTeamWavelength() {
    const totalRounds = 4;
    let currentRound = 0;
    currentThemeIndex = 0;
    showWavelengthIntro(nextRound);
    function nextRound() {
        if (currentRound >= totalRounds) { finish(); return; }
        const hostIndex = currentRound % teams.length;
        const guessIndex = (hostIndex + 1) % teams.length;
        startRound(teams[hostIndex], teams[guessIndex], () => { currentRound++; nextRound(); });
    }
    function finish() { completeCurrentCell(null, true); }
    function startRound(host, guesser, onComplete) {
        const overlay = document.createElement("div");
        overlay.classList.add("game-overlay");
        if (currentThemeIndex >= themeSequence.length) { themeSequence = shuffled(THEME_POOL); currentThemeIndex = 0; }
        const theme = themeSequence[currentThemeIndex++];
        const hostClass = teamColorClass(host.colorIndex);
        const guesserClass = teamColorClass(guesser.colorIndex);
        overlay.innerHTML = `<div class="game-window wavelength-window"><div class="wavelength-header"><h1>Длина волны</h1><p class="wavelength-hint" id="wavelengthHint"></p></div><div class="wavelength-game"><div class="wavelength-arc-wrap">${buildWavelengthSVG("round")}</div><div class="wavelength-opposites"><div class="wavelength-opposite"><span class="opposite-label">${theme.left}</span><span class="opposite-arrow">←</span></div><span class="opposite-divider">|</span><div class="wavelength-opposite"><span class="opposite-label">${theme.right}</span><span class="opposite-arrow">→</span></div></div></div></div>`;
        document.body.appendChild(overlay);
        const ctrl = makeWavelengthController(overlay, 0, 0, 0);
        const hint = overlay.querySelector("#wavelengthHint");
        let phase = "intro", busy = false;
        let holdingLeft = false, holdingRight = false;
        let lastTime = 0, needleRafId = null;
        let pendingPoints = 0, hostBonus = 0, revealTimer = null;
        hint.innerHTML = `<b class="team-label ${hostClass}">${host.name}</b> - смотрят<br><b class="team-label ${guesserClass}">${guesser.name}</b> - закрывают глазки<br>`;
        function tick(time) {
            if (!document.body.contains(overlay)) { needleRafId = null; return; }
            if (phase !== "guessing") { needleRafId = null; return; }
            if (!lastTime) lastTime = time;
            const dt = Math.min(50, time - lastTime) / 1000;
            lastTime = time;
            if (holdingLeft)  ctrl.setNeedle(Math.max(0, ctrl.needle - 55 * dt));
            if (holdingRight) ctrl.setNeedle(Math.min(180, ctrl.needle + 55 * dt));
            needleRafId = requestAnimationFrame(tick);
        }
        needleRafId = requestAnimationFrame(tick);
        function getPoints() {
            let target = 90 + ctrl.zones;
            target = ((target % 360) + 360) % 360;
            if (target > 180) target = 360 - target;
            const d = Math.abs(ctrl.needle - target);
            if (d <= 5) return 4; if (d <= 16) return 3; if (d <= 32) return 2;
            return 0;
        }
        function cleanup() {
            if (needleRafId) cancelAnimationFrame(needleRafId);
            ctrl.stopAll();
            clearTimeout(revealTimer);
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
            overlay.remove();
        }
        function handleConfirm() {
            if (busy || !document.body.contains(overlay)) return;
            if (phase === "intro") {
                busy = true; phase = "spinning"; hint.innerHTML = `колесико крутится...`;
                const zonesOffset = -40 + Math.random() * 80;
                ctrl.setZones(zonesOffset);
                ctrl.animateWheel(ctrl.wheel + 720, 3000, () => {
                    ctrl.animateShutter(180, 1200, () => {
                        phase = "viewing"; busy = false;
                        hint.innerHTML = `<b class="team-label ${hostClass}">${host.name}</b> Придумайте подходящее утверждение <br> и загадайте его для <b class="team-label ${guesserClass}">${guesser.name}</b>`;
                    });
                });
                return;
            }
            if (phase === "viewing") {
                busy = true; phase = "guessing";
                ctrl.animateShutter(0, 1000, () => {
                    busy = false; lastTime = 0;
                    hint.innerHTML = `<b class="team-label ${guesserClass}">${guesser.name}</b> угадывают положение и ставят стрелку`;
                    if (!needleRafId) needleRafId = requestAnimationFrame(tick);
                });
                return;
            }
            if (phase === "guessing") {
                busy = true; phase = "revealing";
                pendingPoints = getPoints(); hostBonus = pendingPoints > 0 ? 1 : 0;
                hint.style.display = "none";
                ctrl.animateShutter(180, 1200, () => {
                    phase = "revealed"; busy = false;
                    revealTimer = setTimeout(() => {
                        cleanup();
                        showWavelengthResult(host, guesser, pendingPoints, () => {
                            guesser.score += pendingPoints;
                            host.score += hostBonus;
                            updateTeamsPanel();
                            onComplete(pendingPoints);
                        });
                    }, 2000);
                });
            }
        }
        function onKeyDown(event) {
            if (!document.body.contains(overlay)) { cleanup(); return; }
            if (event.repeat) return;
            if (isConfirmKey(event)) { event.preventDefault(); handleConfirm(); return; }
            if (phase === "guessing" && !busy) {
                if (event.key === "ArrowLeft")  { event.preventDefault(); holdingLeft = true; }
                if (event.key === "ArrowRight") { event.preventDefault(); holdingRight = true; }
            }
        }
        function onKeyUp(event) {
            if (event.key === "ArrowLeft") holdingLeft = false;
            if (event.key === "ArrowRight") holdingRight = false;
        }
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
    }
}

/* =========================================================
   «УГАДАЙ ПАМЯТНИК»
   ========================================================= */
function startMonumentGame() {
    const totalRounds = MONUMENT_POOL.length;
    if (monumentSequence.length === 0) { monumentSequence = shuffled(MONUMENT_POOL); currentMonumentIndex = 0; }
    let currentRound = 0;
    showMonumentIntro(nextRound);
    function nextRound() {
        if (currentRound >= totalRounds) { finish(); return; }
        if (currentMonumentIndex >= monumentSequence.length) { monumentSequence = shuffled(MONUMENT_POOL); currentMonumentIndex = 0; }
        const monument = monumentSequence[currentMonumentIndex++];
        startMonumentRound(monument, () => { currentRound++; nextRound(); });
    }
    function finish() { completeCurrentCell(null, true); }
}
function showMonumentIntro(onStart) {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    overlay.innerHTML = `<div class="game-window monument-window"><div class="monument-header"><h1>Угадай памятник</h1></div></div>`;
    document.body.appendChild(overlay);
    const keyHandler = onConfirm(overlay, () => {
        overlay.remove();
        document.removeEventListener("keydown", keyHandler);
        onStart();
    });
}
function startMonumentRound(monument, onRoundEnd) {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    overlay.innerHTML = `<div class="game-window monument-window"><div class="monument-header"><h1>Угадай памятник</h1></div><div class="monument-body"><div class="monument-photo"><img src="${monument.image}" alt="${monument.title}"></div><div class="monument-text"><h2 class="monument-title">${monument.title}</h2><p class="monument-question">${monument.question}</p></div></div></div>`;
    document.body.appendChild(overlay);
    let phase = "question", busy = false, scoreOpen = false;
    function cleanup() { document.removeEventListener("keydown", onKey); overlay.remove(); }
    function showAnswerSlide() {
        overlay.innerHTML = `<div class="game-window monument-window monument-answer-window"><div class="monument-answer-photo"><img src="${monument.image}" alt="${monument.title}"></div><p class="monument-answer-text">${monument.answer}</p></div>`;
    }
    function openScorePanel() {
        scoreOpen = true;
        setTimeout(() => { showScoreScreen(() => { scoreOpen = false; cleanup(); onRoundEnd(); }); }, 0);
    }
    function onKey(event) {
        if (!document.body.contains(overlay)) { cleanup(); return; }
        if (event.repeat) return;
        if (!isConfirmKey(event)) return;
        event.preventDefault();
        if (busy) return;
        if (scoreOpen || $(".score-panel")) return;
        if (phase === "question") { phase = "answer"; showAnswerSlide(); return; }
        if (phase === "answer") { phase = "score"; busy = true; openScorePanel(); return; }
    }
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ПРОДОЛЖИ ЗАКОН»
   ========================================================= */
function startLawGame() {
    const totalRounds = LAW_POOL.length;
    if (lawSequence.length === 0) { lawSequence = shuffled(LAW_POOL); currentLawIndex = 0; }
    const introOverlay = document.createElement("div");
    introOverlay.classList.add("game-overlay");
    introOverlay.innerHTML = `<div class="game-window law-intro-window"><h1 class="law-intro-title">Продолжи<br>закон</h1></div>`;
    document.body.appendChild(introOverlay);
    const introKeyHandler = onConfirm(introOverlay, () => {
        introOverlay.remove();
        document.removeEventListener("keydown", introKeyHandler);
        runGame();
    });
    function runGame() {
        let currentRound = 0;
        const overlay = document.createElement("div");
        overlay.classList.add("game-overlay");
        overlay.innerHTML = `<div class="game-window law-window"><div class="law-header"><h1>Продолжи закон</h1><div class="law-progress" id="lawProgress"></div></div><div class="law-body"><article class="law-card" id="lawCard"><div class="law-article"><span class="law-number" id="lawNumber">1</span></div><p class="law-start" id="lawStart"></p><p class="law-dots" id="lawDots">···</p><p class="law-answer" id="lawAnswer"></p><p class="law-note" id="lawNote"></p></article></div></div>`;
        document.body.appendChild(overlay);
        const cardEl = overlay.querySelector("#lawCard");
        const startEl = overlay.querySelector("#lawStart");
        const answerEl = overlay.querySelector("#lawAnswer");
        const noteEl = overlay.querySelector("#lawNote");
        const progressEl = overlay.querySelector("#lawProgress");
        const numberEl = overlay.querySelector("#lawNumber");
        let phase = "intro", currentLaw = null, scoreOpen = false;
        function renderProgress() {
            progressEl.innerHTML = Array.from({ length: totalRounds }, (_, i) => `<span class="law-dot${i < currentRound ? " filled" : ""}${i === currentRound ? " current" : ""}"></span>`).join("");
        }
        function showLaw() {
            if (currentLawIndex >= lawSequence.length) { lawSequence = shuffled(LAW_POOL); currentLawIndex = 0; }
            currentLaw = lawSequence[currentLawIndex++];
            numberEl.textContent = currentRound + 1;
            startEl.textContent = currentLaw.start;
            answerEl.textContent = currentLaw.answer;
            noteEl.textContent = currentLaw.note || "";
            cardEl.classList.remove("revealed");
            renderProgress();
        }
        function openScorePanel() {
            scoreOpen = true;
            setTimeout(() => { showScoreScreen(() => {
                scoreOpen = false;
                currentRound++;
                if (currentRound >= totalRounds) { document.removeEventListener("keydown", onKey); overlay.remove(); completeCurrentCell(null, true); return; }
                phase = "question"; showLaw();
            }); }, 0);
        }
        function onKey(event) {
            if (!document.body.contains(overlay)) { document.removeEventListener("keydown", onKey); return; }
            if (event.repeat) return;
            if (!isConfirmKey(event)) return;
            event.preventDefault();
            if (scoreOpen || $(".score-panel")) return;
            if (phase === "intro") { phase = "question"; showLaw(); return; }
            if (phase === "question") { cardEl.classList.add("revealed"); phase = "answer"; return; }
            if (phase === "answer") { phase = "score"; openScorePanel(); return; }
        }
        phase = "intro";
        document.addEventListener("keydown", onKey);
    }
}

/* =========================================================
   «АНКЕТЫ ЗНАКОМСТВ»
   ========================================================= */
function startProfileGame() {
    const totalRounds = 6;
    if (profileSequence.length === 0) { profileSequence = shuffled(PROFILE_POOL).slice(0, totalRounds); currentProfileIndex = 0; }
    const introOverlay = document.createElement("div");
    introOverlay.classList.add("game-overlay");
    introOverlay.innerHTML = `<div class="game-window profile-intro-window"><h1 class="profile-intro-title">Анкеты<br>знакомств</h1></div>`;
    document.body.appendChild(introOverlay);
    const introKeyHandler = onConfirm(introOverlay, () => {
        introOverlay.remove();
        document.removeEventListener("keydown", introKeyHandler);
        runGame();
    });
    function runGame() {
        let currentRound = 0;
        const overlay = document.createElement("div");
        overlay.classList.add("game-overlay");
        overlay.innerHTML = `<div class="game-window profile-window"><div class="profile-header"><h1>Анкеты знакомств</h1><div class="profile-progress" id="profileProgress"></div></div><div class="profile-body"><article class="profile-card" id="profileCard"><header class="profile-card-head"><span class="profile-avatar" id="profileAvatar">А</span><div class="profile-name-block"><h2 class="profile-name" id="profileName"></h2><p class="profile-meta" id="profileMeta"></p></div><span class="profile-round" id="profileRound"></span></header><p class="profile-text" id="profileText"></p><ul class="profile-hints" id="profileHints"></ul></article></div></div>`;
        document.body.appendChild(overlay);
        const progressEl = overlay.querySelector("#profileProgress");
        const avatarEl = overlay.querySelector("#profileAvatar");
        const nameEl = overlay.querySelector("#profileName");
        const metaEl = overlay.querySelector("#profileMeta");
        const roundEl = overlay.querySelector("#profileRound");
        const textEl = overlay.querySelector("#profileText");
        const hintsEl = overlay.querySelector("#profileHints");
        const cardEl = overlay.querySelector("#profileCard");
        let phase = "hints", hintsShown = 0, currentProfile = null, scoreOpen = false;
        const isSpaceKey = e => e.key === " " || e.code === "Space";
        const isEnterKey = e => e.key === "Enter";
        function renderProgress() {
            progressEl.innerHTML = Array.from({ length: totalRounds }, (_, i) => `<span class="profile-dot${i < currentRound ? " filled" : ""}${i === currentRound ? " current" : ""}"></span>`).join("");
        }
        function showProfile() {
            currentProfile = profileSequence[currentProfileIndex++];
            hintsShown = 0; phase = "hints";
            avatarEl.textContent = currentProfile.author.charAt(0).toUpperCase();
            nameEl.textContent = `${currentProfile.author}, ${currentProfile.age}`;
            metaEl.textContent = currentProfile.city;
            roundEl.textContent = `Анкета ${currentRound + 1} / ${totalRounds}`;
            textEl.textContent = currentProfile.text;
            hintsEl.innerHTML = "";
            cardEl.classList.remove("revealed");
            const oldAnswer = cardEl.querySelector(".profile-answer");
            if (oldAnswer) oldAnswer.remove();
            renderProgress();
        }
        function showNextHint() {
            const hint = currentProfile.hints[hintsShown];
            hintsShown++;
            const li = document.createElement("li");
            li.className = "profile-hint visible";
            li.innerHTML = `<span class="profile-hint-num">Подсказка ${hintsShown}</span><span class="profile-hint-text">${hint}</span>`;
            hintsEl.appendChild(li);
        }
        function revealAnswer() {
            phase = "revealed";
            const answerEl = document.createElement("div");
            answerEl.className = "profile-answer";
            answerEl.innerHTML = `<span class="profile-answer-label">Ответ</span><span class="profile-answer-name">${currentProfile.answer}</span>`;
            cardEl.appendChild(answerEl);
            cardEl.classList.add("revealed");
        }
        function openScorePanel() {
            scoreOpen = true;
            setTimeout(() => { showScoreScreen(() => {
                scoreOpen = false;
                currentRound++;
                if (currentRound >= totalRounds) { cleanup(); completeCurrentCell(null, true); return; }
                showProfile();
            }); }, 0);
        }
        function cleanup() { document.removeEventListener("keydown", onKey); overlay.remove(); }
        function onKey(event) {
            if (!document.body.contains(overlay)) { cleanup(); return; }
            if (event.repeat) return;
            if (scoreOpen || $(".score-panel")) return;
            if (phase === "hints") {
                if (isSpaceKey(event)) { event.preventDefault(); if (hintsShown < currentProfile.hints.length) showNextHint(); return; }
                if (isEnterKey(event)) { event.preventDefault(); revealAnswer(); return; }
                return;
            }
            if (phase === "revealed" && isEnterKey(event)) {
                event.preventDefault(); phase = "score"; openScorePanel();
            }
        }
        showProfile();
        document.addEventListener("keydown", onKey);
    }
}

/* =========================================================
   «АКТУАЛЬНОСТЬ ТЕМЫ ИССЛЕДОВАНИЯ»
   ========================================================= */
function startTopicGame() {
    const assignments = teams.map((team, i) => ({ team, topic: TOPIC_POOL[i] }));
    let currentIndex = 0, busy = false, phase = "intro", finished = false;
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);
    function renderIntro() {
        overlay.innerHTML = `<div class="game-window topic-intro-window"><h1 class="topic-intro-title">Актуальность<br>темы исследования</h1></div>`;
    }
    function render() {
        const { team, topic } = assignments[currentIndex];
        const teamClass = teamColorClass(team.colorIndex);
        overlay.innerHTML = `<div class="game-window topic-window"><div class="topic-header"><h1>Актуальность темы</h1><p class="topic-round-label"><b class="team-label ${teamClass}">${team.name}</b></p></div><div class="topic-stage"><div class="topic-photo-wrap"><img class="topic-photo" src="${topic.image}" alt="Актуальность темы"></div></div><div class="topic-progress">${assignments.map((a, i) => { const cls = ["topic-pip", teamColorClass(a.team.colorIndex)]; if (i === currentIndex) cls.push("active"); return `<span class="${cls.join(" ")}"></span>`; }).join("")}</div></div>`;
    }
    function move(delta) {
        if (busy || finished) return;
        busy = true;
        currentIndex = (currentIndex + delta + assignments.length) % assignments.length;
        render();
        setTimeout(() => { busy = false; }, 120);
    }
    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        showScoreScreen(() => {
            overlay.remove();
            completeCurrentCell(null, true);
        });
    }
    function onKey(e) {
        if (!document.body.contains(overlay)) { document.removeEventListener("keydown", onKey); return; }
        if (e.repeat) return;
        if (phase === "intro") {
            if (isConfirmKey(e)) { e.preventDefault(); phase = "game"; render(); }
            return;
        }
        if (e.key === "ArrowLeft")  { e.preventDefault(); move(-1); return; }
        if (e.key === "ArrowRight") { e.preventDefault(); move(1);  return; }
        if (isConfirmKey(e)) { e.preventDefault(); finish(); return; }
        if (e.key === "Escape") { e.preventDefault(); finish(); }
    }
    renderIntro();
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ФОТОМОНТАЖ»
   ========================================================= */
function startPosterGame() {
    const baseRounds = 2;
    let plan = POSTER_POOL.slice(0, 3);
    let rounds = plan.slice(0, baseRounds);
    let bonusAdded = false, currentRound = 0, finished = false, scoreOpen = false;
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);
    function renderIntro() {
        overlay.innerHTML = `<div class="game-window poster-intro-window"><h1 class="poster-intro-title">Фотомонтаж<br>чтение советских плакатов</h1></div>`;
    }
    function renderRound() {
        if (currentRound >= rounds.length) { finish(); return; }
        const poster = rounds[currentRound];
        overlay.innerHTML = `<div class="game-window poster-window"><div class="poster-header"><h1>Фотомонтаж</h1><p class="poster-round-label">Раунд ${currentRound + 1} из ${rounds.length}</p></div><div class="poster-stage"><img class="poster-photo" src="${poster.image}" alt="${poster.title}"></div></div>`;
    }
    function openScoreAndNext() {
        scoreOpen = true;
        setTimeout(() => { showScoreScreen(() => {
            scoreOpen = false;
            currentRound++;
            if (currentRound >= rounds.length) { finish(); return; }
            renderRound();
        }); }, 0);
    }
    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        completeCurrentCell(null, true);
    }
    function addBonusRound() {
        if (bonusAdded) return;
        if (plan.length < 3) return;
        bonusAdded = true;
        rounds = plan.slice(0, 3);
        if (currentRound < rounds.length) renderRound();
    }
    let phase = "intro";
    function onKey(e) {
        if (!document.body.contains(overlay)) { document.removeEventListener("keydown", onKey); return; }
        if (e.repeat) return;
        if (scoreOpen) return;
        const key = e.key.toLowerCase();
        if (phase === "game" && (key === "d" || key === "в")) { e.preventDefault(); addBonusRound(); return; }
        if (!isConfirmKey(e)) return;
        e.preventDefault();
        if (phase === "intro") { phase = "rules"; renderRules(); return; }
        if (phase === "rules") { phase = "game"; renderRound(); return; }
        if (phase === "game") { openScoreAndNext(); return; }
    }
    renderIntro();
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ЧТО БЫЛО ДАЛЬШЕ»
   ========================================================= */
function startFilmGame() {
    const ROUNDS_PER_TEAM = 3;
    const bag = shuffled(FILM_POOL).slice(0, ROUNDS_PER_TEAM * 2);
    const leftFilms = bag.slice(0, ROUNDS_PER_TEAM);
    const rightFilms = bag.slice(ROUNDS_PER_TEAM, ROUNDS_PER_TEAM * 2);
    const state = {
        left:  { currentIndex: 0, revealed: false, finished: false },
        right: { currentIndex: 0, revealed: false, finished: false }
    };
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);
    let phase = "intro", scoreOpen = false, finished = false;
    function renderIntro() {
        overlay.innerHTML = `<div class="game-window film-intro-window"><h1 class="film-intro-title">Что было<br>дальше</h1><p class="film-intro-sub">дореволюционные фильмы</p></div>`;
    }
    function renderGame() {
        const t1 = teams[0], t2 = teams[1];
        overlay.innerHTML = `<div class="film-split">${renderPane("left", t1, teamColorClass(t1.colorIndex), leftFilms)}<div class="film-divider"></div>${renderPane("right", t2, teamColorClass(t2.colorIndex), rightFilms)}</div>`;
    }
    function renderPane(side, team, teamClass, films) {
        const st = state[side];
        const film = films[st.currentIndex];
        const badge = st.finished
            ? `<span class="film-pane-round film-pane-round--done">все раунды пройдены</span>`
            : `<span class="film-pane-round">раунд ${st.currentIndex + 1} / ${films.length}</span>`;
        const answerHTML = st.revealed
            ? `<div class="film-answer"><span class="film-answer-label">Концовка</span><p class="film-answer-text">${film.answer}</p></div>` : "";
        return `<div class="film-pane film-pane--${side} ${teamClass}"><div class="film-pane-head"><span class="film-pane-team team-label">${team.name}</span>${badge}</div><div class="film-pane-body"><h2 class="film-title">«${film.title}»</h2><p class="film-plot">${film.plot}</p><ul class="film-questions">${film.questions.map(q => `<li>${q}</li>`).join("")}</ul>${answerHTML}</div></div>`;
    }
    function pressSide(side, films) {
        const st = state[side];
        if (st.finished) return;
        if (!st.revealed) {
            st.revealed = true;
            if (st.currentIndex + 1 >= films.length) st.finished = true;
        } else {
            if (st.currentIndex + 1 < films.length) { st.currentIndex++; st.revealed = false; }
        }
        renderGame();
    }
    function openScore() {
        scoreOpen = true;
        setTimeout(() => { showScoreScreen(() => { scoreOpen = false; finish(); }); }, 0);
    }
    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        completeCurrentCell(null, true);
    }
    function onKey(e) {
        if (!document.body.contains(overlay)) { document.removeEventListener("keydown", onKey); return; }
        if (e.repeat) return;
        if (scoreOpen) return;
        const key = e.key.toLowerCase();
        if (phase === "intro") { if (isConfirmKey(e)) { e.preventDefault(); phase = "game"; renderGame(); } return; }
        if (key === "q" || key === "й") { e.preventDefault(); pressSide("left", leftFilms); return; }
        if (key === "w" || key === "ц") { e.preventDefault(); pressSide("right", rightFilms); return; }
        if (isConfirmKey(e)) { e.preventDefault(); openScore(); return; }
    }
    renderIntro();
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ТИПЫ ЛЮБВИ»
   ========================================================= */
function startLoveGame() {
    const rounds = shuffled(LOVE_POOL);
    const totalRounds = rounds.length;
    let currentRound = 0, phase = "intro", scoreOpen = false, finished = false;
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);
    function renderIntro() {
        overlay.innerHTML = `<div class="game-window love-intro-window"><h1 class="love-intro-title">Типы<br>любви</h1></div>`;
    }
    function renderCard() {
        const pair = rounds[currentRound];
        overlay.innerHTML = `<div class="game-window love-window"><div class="love-header"><h1>Типы любви</h1><p class="love-round-label">Раунд ${currentRound + 1} из ${totalRounds}</p></div><div class="love-stage"><div class="love-photo-wrap"><img class="love-photo" src="${pair.image}" alt="${pair.couple}"></div></div><h2 class="love-couple">${pair.couple}</h2><p class="love-question">Какой это тип любви?</p></div>`;
    }
    function renderAnswer() {
        const pair = rounds[currentRound];
        overlay.innerHTML = `<div class="game-window love-window"><div class="love-header"><h1>Типы любви</h1><p class="love-round-label">Раунд ${currentRound + 1} из ${totalRounds}</p></div><div class="love-stage"><div class="love-photo-wrap"><img class="love-photo" src="${pair.image}" alt="${pair.couple}"></div></div><h2 class="love-couple">${pair.couple}</h2><div class="love-answer"><span class="love-answer-label">Тип любви</span><span class="love-answer-type">${pair.type}</span></div></div>`;
    }
    function openScoreAndNext() {
        scoreOpen = true;
        setTimeout(() => { showScoreScreen(() => {
            scoreOpen = false;
            currentRound++;
            if (currentRound >= totalRounds) { finish(); return; }
            phase = "game"; renderCard();
        }); }, 0);
    }
    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        completeCurrentCell(null, true);
    }
    function onKey(e) {
        if (!document.body.contains(overlay)) { document.removeEventListener("keydown", onKey); return; }
        if (e.repeat) return;
        if (scoreOpen) return;
        if (!isConfirmKey(e)) return;
        e.preventDefault();
        if (phase === "intro") { phase = "game"; renderCard(); return; }
        if (phase === "game") { phase = "answer"; renderAnswer(); return; }
        if (phase === "answer") { openScoreAndNext(); return; }
    }
    renderIntro();
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ШИЗОИСТОРИЯ» — 3 раунда, всё на картинках
   ========================================================= */
function startShizoGame() {
    const directions = SHIZO_DIRECTION_IMAGES.slice(0, 2);
    const rounds = SHIZO_ROUND_IMAGES;

    let phase = "intro";     // "intro" | "directions" | "rounds"
    let currentRound = 0;
    let scoreOpen = false;
    let finished = false;

    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);

    function renderIntro() {
        overlay.innerHTML = `
            <div class="game-window shizo-intro-window">
                <h1 class="shizo-intro-title">Шизо<br>история</h1>
            </div>`;
    }

    function renderDirections() {
        const t1 = teams[0], t2 = teams[1];
        const c1 = teamColorClass(t1.colorIndex);
        const c2 = teamColorClass(t2.colorIndex);

        overlay.innerHTML = `
            <div class="shizo-directions">
                <div class="shizo-dir-pane ${c1}">
                    <div class="shizo-dir-head">
                        <span class="shizo-dir-team team-label">${t1.name}</span>
                    </div>
                    <div class="shizo-dir-body">
                        <img class="shizo-dir-photo" src="${directions[0]}" alt="">
                    </div>
                </div>

                <div class="shizo-dir-divider"></div>

                <div class="shizo-dir-pane ${c2}">
                    <div class="shizo-dir-head">
                        <span class="shizo-dir-team team-label">${t2.name}</span>
                    </div>
                    <div class="shizo-dir-body">
                        <img class="shizo-dir-photo" src="${directions[1]}" alt="">
                    </div>
                </div>
            </div>`;
    }

    function renderRound() {
        if (currentRound >= rounds.length) { finish(); return; }
        const img = rounds[currentRound];

        overlay.innerHTML = `
            <div class="game-window shizo-window">
                <div class="shizo-header">
                    <h1>Шизоистория</h1>
                    <p class="shizo-round-label">Раунд ${currentRound + 1} из ${rounds.length}</p>
                </div>
                <div class="shizo-stage">
                    <img class="shizo-photo" src="${img}" alt="">
                </div>
            </div>`;
    }

    function openScoreAndNext() {
        scoreOpen = true;
        setTimeout(() => {
            showScoreScreen(() => {
                scoreOpen = false;
                currentRound++;
                if (currentRound >= rounds.length) { finish(); return; }
                renderRound();
            });
        }, 0);
    }

    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        completeCurrentCell(null, true);
    }

    function onKey(e) {
        if (!document.body.contains(overlay)) {
            document.removeEventListener("keydown", onKey);
            return;
        }
        if (e.repeat) return;
        if (scoreOpen) return;
        if (!isConfirmKey(e)) return;
        e.preventDefault();

        if (phase === "intro") {
            phase = "directions";
            renderDirections();
            return;
        }
        if (phase === "directions") {
            phase = "rounds";
            renderRound();
            return;
        }
        if (phase === "rounds") {
            openScoreAndNext();
            return;
        }
    }

    renderIntro();
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   «ЭМОЦИОНАЛЬНЫЕ МАТРИЦЫ ЗОРИНА»
   интро → теория → пример → показ карточек → очки → конец
   ========================================================= */
function startEmotionGame() {
    const bag = shuffled(EMOTION_GROUPS).slice(0, 4);
    const teamCards = [bag.slice(0, 2), bag.slice(2, 4)];

    let phase = "intro";     // "intro" | "theory" | "example" | "show"
    let scoreOpen = false;
    let finished = false;

    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    document.body.appendChild(overlay);

    /* ---------------- ИНТРО ---------------- */
    function renderIntro() {
        overlay.innerHTML = `
            <div class="game-window emotion-intro-window">
                <h1 class="emotion-intro-title">Эмоциональные<br>матрицы</h1>
                <p class="emotion-intro-sub">по концепции Андрея Зорина</p>
            </div>`;
    }

    /* ---------------- ТЕОРИЯ ---------------- */
    function renderTheory() {
        overlay.innerHTML = `
            <div class="game-window emotion-text-window">
                <div class="emotion-text-header"><h1>Что это такое</h1></div>
                <p class="emotion-text-body">${EMOTION_INTRO}</p>
            </div>`;
    }

    /* ---------------- ПРИМЕР ---------------- */
    function renderExample() {
        overlay.innerHTML = `
            <div class="game-window emotion-text-window">
                <div class="emotion-text-header">
                    <h1>Пример</h1>
                    <p class="emotion-text-sub">Матрица суфражисток в XXI веке</p>
                </div>
                <p class="emotion-text-body">${EMOTION_EXAMPLE}</p>
            </div>`;
    }

    /* ---------------- ПОКАЗ КАРТОЧЕК ---------------- */
    function renderCards() {
    const t1 = teams[0], t2 = teams[1];
    const c1 = teamColorClass(t1.colorIndex);
    const c2 = teamColorClass(t2.colorIndex);

    overlay.innerHTML = `
        <div class="game-window emotion-window">
            <div class="emotion-header">
                <h1>Эмоциональные матрицы</h1>
                <p class="emotion-subtitle">
                    Обсудите, какие эмоциональные матрицы построили бы эти группы в XXI веке
                </p>
            </div>

            <div class="emotion-show">
                <div class="emotion-show-pane ${c1}">
                    <div class="emotion-show-team team-label">${t1.name}</div>
                    <div class="emotion-show-cards">
                        <div class="emotion-show-card">${teamCards[0][0]}</div>
                        <div class="emotion-show-card">${teamCards[0][1]}</div>
                    </div>
                </div>

                <div class="emotion-show-divider"></div>

                <div class="emotion-show-pane ${c2}">
                    <div class="emotion-show-team team-label">${t2.name}</div>
                    <div class="emotion-show-cards">
                        <div class="emotion-show-card">${teamCards[1][0]}</div>
                        <div class="emotion-show-card">${teamCards[1][1]}</div>
                    </div>
                </div>
            </div>
        </div>`;
}

    /* ---------------- ПАНЕЛЬ ОЧКОВ + КОНЕЦ ---------------- */
    function openScore() {
        scoreOpen = true;
        setTimeout(() => {
            showScoreScreen(() => {
                scoreOpen = false;
                finish();
            });
        }, 0);
    }

    function finish() {
        if (finished) return;
        finished = true;
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        completeCurrentCell(null, true);
    }

    /* ---------------- КЛАВИАТУРА ---------------- */
    function onKey(e) {
        if (!document.body.contains(overlay)) {
            document.removeEventListener("keydown", onKey);
            return;
        }
        if (e.repeat) return;
        if (scoreOpen) return;
        if (!isConfirmKey(e)) return;
        e.preventDefault();

        if (phase === "intro")   { phase = "theory";  renderTheory();  return; }
        if (phase === "theory")  { phase = "example"; renderExample(); return; }
        if (phase === "example") { phase = "show";    renderCards();   return; }
        if (phase === "show")    { openScore(); return; }
    }

    renderIntro();
    document.addEventListener("keydown", onKey);
}


/* =========================================================
   ПАНЕЛЬ ОЧКОВ
   ========================================================= */
function showScoreScreen(onDone) {
    const backdrop = document.createElement("div");
    backdrop.classList.add("score-backdrop");
    document.body.appendChild(backdrop);

    const panel = document.createElement("div");
    panel.classList.add("score-panel");

    const bonuses = teams.map(() => 0);
    let focusedTeam = 0, applied = false;

    panel.innerHTML = `<div class="score-list" id="scoreList"></div>`;
    document.body.appendChild(panel);
    const listEl = panel.querySelector("#scoreList");

    function render() {
        listEl.innerHTML = teams.map((t, i) => {
            const b = bonuses[i];
            const bonusText = b > 0 ? `+${b}` : (b < 0 ? String(b) : "—");
            const classes = ["score-row", teamColorClass(t.colorIndex)];
            if (i === focusedTeam) classes.push("active");
            return `<div class="${classes.join(" ")}"><span class="score-dot"></span><span class="score-name team-label">${t.name}</span><span class="score-current">${t.score}</span><span class="score-bonus">${bonusText}</span></div>`;
        }).join("");
    }
    render();

    function onKey(event) {
        if (!document.body.contains(panel)) { document.removeEventListener("keydown", onKey); backdrop.remove(); return; }
        if (event.key === "ArrowUp")    { event.preventDefault(); focusedTeam = (focusedTeam - 1 + teams.length) % teams.length; render(); return; }
        if (event.key === "ArrowDown")  { event.preventDefault(); focusedTeam = (focusedTeam + 1) % teams.length; render(); return; }
        if (event.key === "ArrowLeft")  { event.preventDefault(); bonuses[focusedTeam] = Math.max(-10, bonuses[focusedTeam] - 1); render(); return; }
        if (event.key === "ArrowRight") { event.preventDefault(); bonuses[focusedTeam] = Math.min(10, bonuses[focusedTeam] + 1); render(); return; }
        if (isConfirmKey(event)) {
            event.preventDefault();
            if (applied) return;
            applied = true;
            teams.forEach((t, i) => { t.score += bonuses[i]; });
            updateTeamsPanel();
            panel.remove();
            backdrop.remove();
            document.removeEventListener("keydown", onKey);
            if (onDone) onDone();
        }
    }
    document.addEventListener("keydown", onKey);
}

/* =========================================================
   ПОБЕДА
   ========================================================= */
function startVictory() {
    const overlay = document.createElement("div");
    overlay.classList.add("game-overlay");
    const ranked = teams.map(t => ({ ...t })).sort((a, b) => b.score - a.score);
    const isTie = ranked.length > 1 && ranked[0].score === ranked[1].score;
    const winner = ranked[0];
    overlay.innerHTML = `<div class="game-window victory"><h1>${isTie ? "Ничья!" : "Победили " + winner.name}</h1><div class="final-table">${ranked.map((t, i) => `<div class="final-row ${teamColorClass(t.colorIndex)}"><span class="final-place">${i + 1}</span><span class="final-dot"></span><span class="final-name team-label">${t.name}</span><span class="final-score">${t.score}</span></div>`).join("")}</div></div>`;
    document.body.appendChild(overlay);
    onConfirm(overlay, () => overlay.remove());
}

/* =========================================================
   УПРАВЛЕНИЕ ПОЛЕМ / ЗАСТАВКА / СТАРТ / ЧИТ-КОД
   ========================================================= */
document.addEventListener("keydown", event => {
    if ($(".game-overlay") || $(".score-panel")) return;
    if (event.key === "ArrowUp")    { event.preventDefault(); movePlayer("up"); }
    if (event.key === "ArrowDown")  { event.preventDefault(); movePlayer("down"); }
    if (event.key === "ArrowLeft")  { event.preventDefault(); movePlayer("left"); }
    if (event.key === "ArrowRight") { event.preventDefault(); movePlayer("right"); }
    if (event.key === "Enter")      { event.preventDefault(); openCurrentCell(); }
    if (isUndoKey(event))           { event.preventDefault(); undo(); }
});

const splash = document.getElementById("splash");
document.addEventListener("keydown", event => {
    const k = event.key.toLowerCase();
    if (k === "p" || k === "з") {
        event.preventDefault();
        splash.classList.toggle("hidden");
    }
});

gameSequence = shuffled(GAME_POOL);
themeSequence = shuffled(THEME_POOL);
currentThemeIndex = 0;
monumentSequence = shuffled(MONUMENT_POOL);
currentMonumentIndex = 0;
lawSequence = LAW_POOL.slice();
currentLawIndex = 0;
profileSequence = shuffled(PROFILE_POOL).slice(0, 6);
currentProfileIndex = 0;

teams = [
    { name: TEAM_COLORS[0].defaultName, colorIndex: 0, score: 0 },
    { name: TEAM_COLORS[1].defaultName, colorIndex: 1, score: 0 }
];
currentTeamIndex = 0;

updateTeamsPanel();
createBoard();

const CHEAT_GAMES = {
    "1": "Длина волны",
    "2": "Угадай памятник",
    "3": "Продолжи закон",
    "4": "Анкеты знакомств",
    "5": "Актуальность темы",
    "6": "Фотомонтаж",
    "7": "Что было дальше",
    "8": "Типы любви",
    "9": "Шизоистория",
    "0": "Эмоциональные матрицы"
};

document.addEventListener("keydown", event => {
    if ($(".game-overlay") || $(".score-panel")) return;
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    const key = event.key;
    if (!(key in CHEAT_GAMES)) return;
    event.preventDefault();
    const gameName = CHEAT_GAMES[key];
    if (gameName === "Длина волны") startTeamWavelength();
    else if (gameName === "Угадай памятник") startMonumentGame();
    else if (gameName === "Продолжи закон") startLawGame();
    else if (gameName === "Анкеты знакомств") startProfileGame();
    else if (gameName === "Актуальность темы") startTopicGame();
    else if (gameName === "Фотомонтаж") startPosterGame();
    else if (gameName === "Что было дальше") startFilmGame();
    else if (gameName === "Типы любви") startLoveGame();
    else if (gameName === "Шизоистория") startShizoGame();
    else if (gameName === "Эмоциональные матрицы") startEmotionGame();
    else startGame(gameName);
});