import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './dino-request.js';
import { checkArray, getHiddenArray } from './game-function.js';

function getElements(response) {
  let dinoLetters, hiddenArray;
  dinoLetters = response[0][0].split('');
  hiddenArray = response[0][0].split('');
  getHiddenArray(hiddenArray);
  $('.dinoName').text(hiddenArray.join(' '));

  let fails = 0;

  $('form#dinoLetter').submit(function(event){
    event.preventDefault();
    let letter = $('#letter').val();
    $('#letter').val("");
    fails += checkArray(letter, dinoLetters, hiddenArray);
    $('.dinoName').text(hiddenArray.join(' '));
    $('.fails').text(fails);
    $('.guesses').append(letter + " ");
    if (fails >= 5) {
      $('.gameOver').show();
      $('.rightDino').text(dinoLetters.join(''));
    }
    if (dinoLetters.join() == hiddenArray.join()){
      $('.winner').show();
    }
  });
}

async function makeApiCall() {
  const response = await DinoRequest.getDino();
  getElements(response);
}

$(document).ready(function(){
  makeApiCall();
});
