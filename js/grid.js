"use strict";

// MAIN
window.onload = function main(){
  buildColorPallet(undefined);
  buildGrid();
  activateGrid();
};

let brushColor = 'white';

//==============================================================================
// generate grid
function buildGrid(height = 20, width = 20) {
  let $grid = $('#grid');

  for (var row = 0; row < height; row++) {
    var $row = $('<div class="grid-row"');

    for (var col = 0; col < width; col++) {
      var $pixel = $('div class="pixel"');

      $pixel.appendTo($row);
    }
    $row.appendTo($grid);
  }

}

//==============================================================================
// set the pallet colors and add event listener
function buildColorPallet(colors) {
  if (colors === undefined){
    colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo',
    'violet', 'brown', 'black', 'gray', 'white'];
  }

  var inkWellArray = document.getElementsByClassName('pallet-color');

  if (colors.length === inkWellArray.length) {
    for (let i = 0; i < colors.length; i++) {
      inkWellArray[i].style.backgroundColor = colors[i];
    }
  } else {
    console.log("The number of colors doesn't match the number of circles.")
    console.log("I'm terribly sorry, but the world must end.");
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
