let pairNum = null;
let cardNum = null;
let cardArrayShuffled = [];
let hasFlippedCard = false;
let firstCard = undefined;
let secondCard = undefined;

// Algorithm to shuffle an array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function createGameGrid(pairNum, cardNum) {
  $('#game_grid').empty();
  let indexArray = [];
    // generate 3 or 6 unique random numbers between 1 and 898
  while (indexArray.length < pairNum) {
    let random = Math.floor(Math.random() * 898) + 1;
    if (indexArray.indexOf(random) === -1) indexArray.push(random);
  }
  
  if(pairNum == 3) {
    cardArrayShuffled = shuffle([0, 1, 2, 0, 1, 2])
  }else if(pairNum == 6) {
    cardArrayShuffled = shuffle([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5])
  }
  for (i = 0; i < cardNum; i++) {
    $('#game_grid').append(`
      <div class="card">
        <img class="front_face" src="
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexArray[cardArrayShuffled[i]]}.png" alt="">
        <img class="back_face" src="./images/back_face.jpeg" alt="">
      </div>`)
  }
}

function gameLogic() {
  $('.card').on('click', function () {
    $(this).toggleClass('flip')                   // toggleClass 是一个jQuery方法，如果有class, remove it; 如果没有, add it

    if(!hasFlippedCard) {
      firstCard = $(this).find('.front_face')[0];
      hasFlippedCard = true;
    } else {
      secondCard = $(this).find('.front_face')[0];
      if ($(firstCard).attr('src') == $(secondCard).attr('src')) {
        console.log('You win')
      }
    }

  })
}

function setup() {
  $('input[type=radio][name=game_board]').change(function() {
    if (this.value == 'small') {
      createGameGrid(3, 6);
      gameLogic();
    }
    if (this.value == 'large') {
      createGameGrid(6, 12);
      gameLogic();
    }
  });
  
}



$(document).ready(setup);