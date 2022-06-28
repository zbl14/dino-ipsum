import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './dino-request.js';
import { checkArray, getHiddenArray } from './game-function.js'

$(document).ready(function(){
  let promise = DinoRequest.getDino();
  let dinoLetters, hiddenArray;
  promise.then(function(response){
    const body = JSON.parse(response);
    dinoLetters = body[0][0].split('');
    hiddenArray = body[0][0].split('');
    getHiddenArray(hiddenArray);
    console.log(dinoLetters);
    console.log(hiddenArray);
    $('.dinoName').text(hiddenArray.join(' '));
  });
  $('#submit').click(function(event){
    event.preventDefault();
    let letter = $('#letter').val();
    $('#letter').val("");
    console.log(letter);
    checkArray(letter, dinoLetters, hiddenArray);
    console.log(hiddenArray);
    $('.dinoName').text(hiddenArray.join(' '));
  });
});
