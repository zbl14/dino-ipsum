import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoRequest from './dino-request.js';

$(document).ready(function(){
  let promise = DinoRequest.getDino();
  promise.then(function(response){
    const body = JSON.parse(response);
    let dinoLetters = body[0][0].split('')
    console.log(dinoLetters);
    $('.dinoName').text()
  });
});