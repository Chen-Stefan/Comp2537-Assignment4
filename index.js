let pokeNum, cardNum;
let cardArrayShuffled;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;

// Algorithm to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function createGameGrid(pokeNum, cardNum) {
  $("#game_grid").empty();
  let indexArray = [];
  while (indexArray.length < pokeNum) {
    let random = Math.floor(Math.random() * 898) + 1;
    if (indexArray.indexOf(random) === -1) indexArray.push(random);
  }
  cardArrayShuffled = generateShuffledCardArray(pokeNum, cardNum);
  for (i = 0; i < cardNum; i++) {
    $("#game_grid").append(`
      <div class="card">
        <img id="${i + 1}" class="front_face" src="
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          indexArray[cardArrayShuffled[i]]
        }.png" alt="">
        <img class="back_face" src="./images/back_face.jpeg" alt="">
      </div>`);
  }
}

function generateShuffledCardArray(pokeNum, cardNum) {
  if (cardNum == 6) {
    if (pokeNum == 2) {
      cardArrayShuffled = shuffle([0, 1, 0, 1, 0, 1]);
    } else {
      cardArrayShuffled = shuffle([0, 1, 2, 0, 1, 2]);
    }
  }
  if (cardNum == 12) {
    if (pokeNum == 2) {
      cardArrayShuffled = shuffle([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
    } else if (pokeNum == 3) {
      cardArrayShuffled = shuffle([0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]);
    } else if (pokeNum == 4) {
      cardArrayShuffled = shuffle([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
    } else {
      cardArrayShuffled = shuffle([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
    }
  }
  return cardArrayShuffled;
}

function flipCard() {
  $(".card").on("click", function () {
    // If board is locked, stop executing the function
    if (lockBoard) return;
    if ($(this).find(".front_face")[0] === firstCard) return;
    $(this).toggleClass("flip"); // toggleClass is a jQuery method，if class applied, remove it; if not, add it

    if (!hasFlippedCard) {
      firstCard = $(this).find(".front_face")[0];
      hasFlippedCard = true;
    } else {
      secondCard = $(this).find(".front_face")[0];
      hasFlippedCard = false;
      // Check if cards match
      checkForMatch();
    }
  });
}

function checkForMatch() {
  let isMatch =  $(`#${firstCard.id}`).attr("src") === $(`#${secondCard.id}`).attr("src");
  
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  $(`#${firstCard.id}`).parent().off("click");
  $(`#${secondCard.id}`).parent().off("click");
  resetBoard();
}

function unflipCards() {
  // Lock the board right after unmatch
  lockBoard = true;
  setTimeout(() => {
    $(`#${firstCard.id}`).parent().removeClass("flip");
    $(`#${secondCard.id}`).parent().removeClass("flip");
    // Unlock the board when unmatched cards flip back
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function setup() {
  $("input[type=radio][name=game_board]").change(function () {
    $("#game_grid").empty();
    if (this.value == "small") {
      $("#pokemon_radio").hide();
      $("input[type=radio][name=pokemon_size]").change(function () {
        pokeNum = this.value;
        createGameGrid(pokeNum, 6);
        flipCard();
      });
    }
    if (this.value == "large") {
      $("#pokemon_radio").show();
      $("input[type=radio][name=pokemon_size]").change(function () {
        pokeNum = this.value;
        createGameGrid(pokeNum, 12);
        flipCard();
      });
    }
  });
}

$(document).ready(setup);
