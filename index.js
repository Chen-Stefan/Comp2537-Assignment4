let hasFlippedCard = false;
let firstCard = undefined;
let secondCard = undefined;

function createRandomCards() {
  let indexArray = [];
    // generate 3 unique random number between 1 and 898
  while (indexArray.length < 3) {
    let randomIndex = Math.floor(Math.random() * 898) + 1;
    if (indexArray.indexOf(randomIndex) === -1) indexArray.push(randomIndex);
  }
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
  let cardArrayShuffled = shuffle([0, 1, 2, 0, 1, 2]);
  for (i = 0; i < 6; i++) {
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
  createRandomCards();
  gameLogic();
}



$(document).ready(setup);