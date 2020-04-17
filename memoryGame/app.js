document.addEventListener('DOMContentLoaded', () => {

    // cards
    const cardArray = [
        {
            name: 'Python',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png'
        },
        {
            name: 'Python',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png'
        },
        {
            name: 'React',
            img: 'https://cdn.worldvectorlogo.com/logos/react-2.svg'
        },
        {
            name: 'React',
            img: 'https://cdn.worldvectorlogo.com/logos/react-2.svg'
        },
        {
            name: 'Cpp',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png'
        },
        {
            name: 'Cpp',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png'
        },
        {
            name: 'GitHub',
            img: 'https://www.pngitem.com/pimgs/m/128-1280162_github-logo-png-cat-transparent-png.png'
        },
        {
            name: 'GitHub',
            img: 'https://www.pngitem.com/pimgs/m/128-1280162_github-logo-png-cat-transparent-png.png'
        },
        {
            name: 'Vim',
            img: 'https://img2.freepng.es/20181122/hgb/kisspng-vim-text-editor-unix-syntax-highlighting-g-technology-ampquot-thread-5848-12-5bf66f74d09722.1606059915428770448544.jpg'
        },
        {
            name: 'Vim',
            img: 'https://img2.freepng.es/20181122/hgb/kisspng-vim-text-editor-unix-syntax-highlighting-g-technology-ampquot-thread-5848-12-5bf66f74d09722.1606059915428770448544.jpg'
        },
        {
            name: 'Arch',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1200px-Archlinux-icon-crystal-64.svg.png'
        },
        {
            name: 'Arch',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1200px-Archlinux-icon-crystal-64.svg.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    function createBoard() {
        for (let i= 0; i < cardArray.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', 'https://cdn.shopify.com/s/files/1/0034/1809/5731/products/BA001_-_Gurrrl_You_Got_This_-_DigiEnvSq_300x300.jpg?v=1549931512');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }
    
    //check for matches
    function checkForMatch(){
        var cards = document.querySelectorAll('img');
        if (cardsChosen[0] === cardsChosen[1]) {
            alert("you found a match");
            cards[cardsChosenId[0]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_Blank.svg/320px-Flag_Blank.svg.png');
            cards[cardsChosenId[1]].setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_Blank.svg/320px-Flag_Blank.svg.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[cardsChosenId[0]].setAttribute('src', 'https://cdn.shopify.com/s/files/1/0034/1809/5731/products/BA001_-_Gurrrl_You_Got_This_-_DigiEnvSq_300x300.jpg?v=1549931512');
            cards[cardsChosenId[1]].setAttribute('src', 'https://cdn.shopify.com/s/files/1/0034/1809/5731/products/BA001_-_Gurrrl_You_Got_This_-_DigiEnvSq_300x300.jpg?v=1549931512');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'wujuu you won!!';
        }
    }

    // flip your card
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2){
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
});

