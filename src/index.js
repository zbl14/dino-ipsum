import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './dino-request.js';
import { checkArray, getHiddenArray } from './game-function.js';

let dinoLetters, hiddenArray;

function getElements(response) {
  dinoLetters = response[0][0].split('');
  hiddenArray = response[0][0].split('');
  getHiddenArray(hiddenArray);
  $('.dinoName').text(hiddenArray.join(' '));
}

async function makeApiCall() {
  const response = await DinoRequest.getDino();
  getElements(response);
}

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
      $('button').prop("disabled", true);
    }
    if (dinoLetters.join() == hiddenArray.join()){
      $('.winner').show();
      $('button').prop("disabled", true);
    }
  });
});
