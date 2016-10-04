"use strict";

// MAIN
window.onload = function main() {
  buildColorPallet(undefined);

  document.getElementsByTagName('button')[0].addEventListener('click', buildGrid);

  activateGrid();
};

let brushColor = 'white';

//==============================================================================
// generate grid
function buildGrid(event) {
  $('#grid').empty();
  event.preventDefault();

  let dimension = document.getElementById('grid-size').value;
  dimension = Number(dimension);
  console.log(dimension);

  let $grid = $('#grid');

  if (typeof dimension === "number" && dimension >= 30 && dimension <= 50) {
    var height = dimension;
    var width = dimension;
  } else {
    var height = 40;
    var width = 40;
  }

  $("#grid").css("width", function(dimension) {
    return dimension * 10;
  });

  $("#grid").addClass("border");

  // $("#grid").css("min-width", function(dimension) {
  //   return (dimension * 10 + 20);
  // });

  for (var row = 0; row < height; row++) {
    var $row = $('<div class="grid-row">');

    for (var col = 0; col < width; col++) {
      var $pixel = $('<div class="pixel">');

      $pixel.appendTo($row);
    }
    $row.appendTo($grid);
  }

  document.getElementById('grid-size').value = "";
}

//==============================================================================
// set the pallet colors and add event listener
function buildColorPallet(colors) {
  if (colors === undefined){
    colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo',
    'violet', 'brown', 'black', 'gray', 'white'];
  }

  let $pallet = $('#pallet');

  let height = Math.floor(colors.length / 3);
  let width = Math.floor(colors.length / height);

  for (var row = 0; row < height; row++) {
    var $row = $('<div class="pallet-row">');

    for (var col = 0; col < width; col++) {
      var $inkWell = $('<div class="pallet-color">');

      $inkWell.appendTo($row);
    }
    $row.appendTo($pallet);
  }


  var palletArray = document.getElementsByClassName('pallet-color');

  for (let i = 0; i < colors.length; i++) {
    palletArray[i].style.backgroundColor = colors[i];

  }

  var pallet = document.getElementById('pallet');
  pallet.addEventListener('click', setBrushColorHandler);
}

//==============================================================================
// event handler to set the brush color to the background color of the
// event that was clicked
function setBrushColorHandler(event){
  // do not set the brush color to the pallet's background color
  if(event.target === event.currentTarget) {
    return;
  }

  brushColor = event.target.style.backgroundColor;
  setColorIndicator();
}

//==============================================================================
// update the color indicator with the current brush color
function setColorIndicator() {
  var colorIndicator = document.getElementById('current-color');
  colorIndicator.style.backgroundColor = brushColor;
}

//==============================================================================
// add event listener to the grid
function activateGrid() {
  var grid = document.getElementById('grid');
  grid.addEventListener('click', clickGridHandler);
}

//==============================================================================
// event handler to set the background color of the target to the current color
function clickGridHandler(event) {
  // do not allow the event to propogate to the whole grid
  if (event.target === event.currentTarget) {
    return;
  }

  setPixelColor(event.target);
}

//==============================================================================
// set selected pixel to the current color
function setPixelColor(pixel) {
  pixel.style.borderColor = brushColor;
  pixel.style.backgroundColor = brushColor;
}
