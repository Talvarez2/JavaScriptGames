document.addEventListener("DOMContentLoaded", () => {
    const CARD_BACK_URL =
        "https://cdn.shopify.com/s/files/1/0034/1809/5731/products/BA001_-_Gurrrl_You_Got_This_-_DigiEnvSq_300x300.jpg?v=1549931512";
    const BLANK_URL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_Blank.svg/320px-Flag_Blank.svg.png";

    const cardArray = [
        { name: "Python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" },
        { name: "React", img: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
        { name: "Cpp", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" },
        { name: "GitHub", img: "https://www.pngitem.com/pimgs/m/128-1280162_github-logo-png-cat-transparent-png.png" },
        { name: "Vim", img: "https://img2.freepng.es/20181122/hgb/kisspng-vim-text-editor-unix-syntax-highlighting-g-technology-ampquot-thread-5848-12-5bf66f74d09722.1606059915428770448544.jpg" },
        { name: "Arch", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1200px-Archlinux-icon-crystal-64.svg.png" },
    ];

    // Duplicate each card to create pairs, then shuffle with Fisher-Yates
    const cards = [...cardArray, ...cardArray];
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    let chosenCards = [];
    let chosenIds = [];
    let matchCount = 0;
    let lockBoard = false;

    function createBoard() {
        cards.forEach((card, index) => {
            const img = document.createElement("img");
            img.src = CARD_BACK_URL;
            img.alt = "Card back";
            img.dataset.id = index;
            img.addEventListener("click", flipCard);
            grid.appendChild(img);
        });
    }

    function checkForMatch() {
        const allCards = grid.querySelectorAll("img");
        const [idA, idB] = chosenIds;

        if (chosenCards[0] === chosenCards[1]) {
            allCards[idA].src = BLANK_URL;
            allCards[idB].src = BLANK_URL;
            allCards[idA].alt = "Matched";
            allCards[idB].alt = "Matched";
            allCards[idA].classList.add("matched");
            allCards[idB].classList.add("matched");
            allCards[idA].removeEventListener("click", flipCard);
            allCards[idB].removeEventListener("click", flipCard);
            matchCount++;
        } else {
            allCards[idA].src = CARD_BACK_URL;
            allCards[idB].src = CARD_BACK_URL;
        }

        chosenCards = [];
        chosenIds = [];
        lockBoard = false;
        resultDisplay.textContent =
            matchCount === cardArray.length ? "You won!" : matchCount;
    }

    function flipCard() {
        if (lockBoard) return;
        const id = Number(this.dataset.id);
        // Prevent clicking the same card twice
        if (chosenIds.includes(id)) return;

        chosenCards.push(cards[id].name);
        chosenIds.push(id);
        this.src = cards[id].img;
        this.alt = cards[id].name;

        if (chosenCards.length === 2) {
            lockBoard = true;
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});
