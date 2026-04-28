document.addEventListener("DOMContentLoaded", () => {
    const CARD_BACK_URL =
        "https://cdn.shopify.com/s/files/1/0034/1809/5731/products/BA001_-_Gurrrl_You_Got_This_-_DigiEnvSq_300x300.jpg?v=1549931512";
    const BLANK_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_Blank.svg/320px-Flag_Blank.svg.png";
    const FLIP_DELAY_MS = 500;
    const TOTAL_PAIRS = 6;

    const cardArray = [
        { name: "Python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" },
        { name: "React", img: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
        { name: "C++", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" },
        { name: "GitHub", img: "https://www.pngitem.com/pimgs/m/128-1280162_github-logo-png-cat-transparent-png.png" },
        { name: "Vim", img: "https://img2.freepng.es/20181122/hgb/kisspng-vim-text-editor-unix-syntax-highlighting-g-technology-ampquot-thread-5848-12-5bf66f74d09722.1606059915428770448544.jpg" },
        { name: "Arch Linux", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1200px-Archlinux-icon-crystal-64.svg.png" },
    ];

    const grid = document.getElementById("grid");
    const resultDisplay = document.getElementById("result");
    const announcer = document.getElementById("announcer");
    const restartBtn = document.getElementById("restart");

    let chosenCards = [];
    let chosenIds = [];
    let matchCount = 0;
    let lockBoard = false;
    let cards = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function announce(message) {
        announcer.textContent = "";
        requestAnimationFrame(() => { announcer.textContent = message; });
    }

    function flipCard(event) {
        if (lockBoard) return;
        const btn = event.currentTarget;
        const id = Number(btn.dataset.id);
        if (chosenIds.includes(id)) return;

        chosenCards.push(cards[id].name);
        chosenIds.push(id);
        btn.querySelector("img").src = cards[id].img;
        btn.setAttribute("aria-label", cards[id].name);

        if (chosenCards.length === 2) {
            lockBoard = true;
            setTimeout(checkForMatch, FLIP_DELAY_MS);
        }
    }

    function checkForMatch() {
        const buttons = grid.querySelectorAll("button");
        const [idA, idB] = chosenIds;
        const isMatch = chosenCards[0] === chosenCards[1];

        if (isMatch) {
            matchCount++;
            [idA, idB].forEach((id, i) => {
                const btn = buttons[id];
                btn.querySelector("img").src = BLANK_URL;
                btn.setAttribute("aria-label", `${chosenCards[i]} — matched`);
                btn.disabled = true;
            });
            announce(`Matched ${chosenCards[0]}!`);
        } else {
            [idA, idB].forEach((id) => {
                const btn = buttons[id];
                btn.querySelector("img").src = CARD_BACK_URL;
                btn.setAttribute("aria-label", "Face-down card");
            });
            announce("No match.");
        }

        chosenCards = [];
        chosenIds = [];
        lockBoard = false;

        resultDisplay.textContent = matchCount === TOTAL_PAIRS ? "You won!" : matchCount;
        if (matchCount === TOTAL_PAIRS) {
            announce("Congratulations, you matched all pairs!");
        }
    }

    function createBoard() {
        cards = shuffle([...cardArray, ...cardArray]);
        chosenCards = [];
        chosenIds = [];
        matchCount = 0;
        lockBoard = false;
        resultDisplay.textContent = "0";
        grid.innerHTML = "";

        cards.forEach((card, index) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.dataset.id = index;
            btn.setAttribute("aria-label", "Face-down card");
            btn.addEventListener("click", flipCard);

            const img = document.createElement("img");
            img.src = CARD_BACK_URL;
            img.alt = "";
            img.draggable = false;

            btn.appendChild(img);
            grid.appendChild(btn);
        });

        announce("Board reset. Find all matching pairs!");
    }

    restartBtn.addEventListener("click", createBoard);
    createBoard();
});
