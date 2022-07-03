import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './services/dino-request-service';
import { checkArray, getHiddenArray } from './js/game-function';

let dinoLetters, hiddenArray;

let getElements = (response) => {
  dinoLetters = response[0][0].split('');
  hiddenArray = dinoLetters.slice();
  getHiddenArray(hiddenArray);
  $('.dinoName').text(hiddenArray.join(' '));
};

async function makeApiCall() {
  const response = await DinoRequest.getDino();
  getElements(response);
}

let playAgain = () => {
  $('#playAgain').show().click(function() {
    location.reload();
  });
};

$(document).ready(function(){
  makeApiCall();
  let fails = 0;
  $('form#dinoLetter').submit(function(event){
    event.preventDefault();
    let letter = $('#letter').val();
    $('#letter').val("");
    fails += checkArray(letter, dinoLetters, hiddenArray);
    $('.dinoName').text(hiddenArray.join(' '));
    $('.fails').text(fails + "/5");
    $('.guesses').append(letter + " ");
    if (fails >= 5) {
      $('.gameOver').show();
      $('.rightDino').text(dinoLetters.join(''));
      $('#submit').prop("disabled", true);
      playAgain();
    }
    if (dinoLetters.join() == hiddenArray.join()){
      $('.winner').show();
      $('#submit').prop("disabled", true);
      playAgain();
    }
  });
});
