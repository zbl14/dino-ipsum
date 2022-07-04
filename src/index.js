import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './services/dino-request-service';
import { GiphyService } from './services/giphy-service';
import { checkArray, getHiddenArray } from './js/game-function';

let dinoLetters, hiddenArray, fails;

let getElements = (response) => {
  dinoLetters = response[0][0].split('');
  hiddenArray = dinoLetters.slice();
  getHiddenArray(hiddenArray);
  $('.dinoName').text(hiddenArray.join(' '));
};

let showGif = (response) => {
  if (response.data) {
    const url = response.data[0].images.downsized.url;
    $('.showGif').html(`<img src='${url}'>`);
  } else {
    $('.showErrors').show().text(`There was an error processing your request: ${response}`);
  }
};


async function makeApiCall() {
  const response = await DinoRequest.getDino();
  getElements(response);
  let giphy = await GiphyService.getGif(response[0][0]);
  if (giphy.data.length == 0) {
    giphy = await GiphyService.getGif("eat by dino");
  }
  showGif(giphy);
}

let checkGame = () => {
  if (fails >= 5) {
    $('.gameOver').show();
    $('.rightDino').text(dinoLetters.join(''));
    $('#submit').prop("disabled", true);
    $('.showGif').show();
    playAgain();
  }
  if (dinoLetters.join() == hiddenArray.join()){
    $('.winner').show();
    $('#submit').prop("disabled", true);
    playAgain();
  }
};

let playAgain = () => {
  $('#playAgain').show().click(function() {
    location.reload();
  });
};

$(document).ready(function(){
  makeApiCall();
  fails = 0;
  $('form#dinoLetter').submit(function(event){
    event.preventDefault();
    let letter = $('#letter').val();
    $('#letter').val("");
    fails += checkArray(letter, dinoLetters, hiddenArray);
    $('.dinoName').text(hiddenArray.join(' '));
    $('.fails').text(fails + "/5");
    $('.guesses').append(letter + " ");
    checkGame();
  });
});
