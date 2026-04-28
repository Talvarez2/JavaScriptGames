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

    let cards = [];
    let chosenCards = [];
    let chosenIds = [];
    let matchCount = 0;
    let lockBoard = false;

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
    }

    function checkForMatch() {
        const buttons = grid.querySelectorAll("button");
        const [idA, idB] = chosenIds;

        if (chosenCards[0] === chosenCards[1]) {
            buttons[idA].querySelector("img").src = BLANK_URL;
            buttons[idB].querySelector("img").src = BLANK_URL;
            buttons[idA].classList.add("matched");
            buttons[idB].classList.add("matched");
            buttons[idA].setAttribute("aria-label", `${chosenCards[0]} — matched`);
            buttons[idB].setAttribute("aria-label", `${chosenCards[1]} — matched`);
            buttons[idA].disabled = true;
            buttons[idB].disabled = true;
            matchCount++;
            announce(`Matched ${chosenCards[0]}!`);
        } else {
            buttons[idA].querySelector("img").src = CARD_BACK_URL;
            buttons[idB].querySelector("img").src = CARD_BACK_URL;
            buttons[idA].setAttribute("aria-label", "Face-down card");
            buttons[idB].setAttribute("aria-label", "Face-down card");
            announce("No match.");
        }

        chosenCards = [];
        chosenIds = [];
        lockBoard = false;

        if (matchCount === TOTAL_PAIRS) {
            resultDisplay.textContent = "You won!";
            announce("Congratulations, you matched all pairs!");
        } else {
            resultDisplay.textContent = matchCount;
        }
    }

    function flipCard() {
        if (lockBoard) return;
        const id = Number(this.dataset.id);
        if (chosenIds.includes(id)) return;

        chosenCards.push(cards[id].name);
        chosenIds.push(id);
        this.querySelector("img").src = cards[id].img;
        this.setAttribute("aria-label", cards[id].name);

        if (chosenCards.length === 2) {
            lockBoard = true;
            setTimeout(checkForMatch, FLIP_DELAY_MS);
        }
    }

    restartBtn.addEventListener("click", createBoard);
    createBoard();
});
