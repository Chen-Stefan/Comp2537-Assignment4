let hasFlippedCard = false;
let firstCard = undefined;
let secondCard = undefined;

function setup() {
  $('.card').on('click', function () {
    $(this).toggleClass('flip')                   // toggleClass 是一个jQuery方法

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



$(document).ready(setup);