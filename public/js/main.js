"use strict";

//==============================================================================
// MAIN - start here!
window.onload = function main() {
  buildColorPallet(undefined);

  document.getElementById('new-btn').addEventListener('click', buildGrid);
  document.getElementById('save-btn').addEventListener('click', serializeGrid);
  document.getElementById('open-btn').addEventListener('click', deserializeGrid);
  document.getElementById('browse-btn').addEventListener('click', function() {
    window.open("api-call.ejs","");
  });

  checkAndBuildPxlImg();

  activateGrid();
};

let brushColor = 'white';

function checkAndBuildPxlImg() {
  let url = window.location.search.split('=');
  if (url[0] === "?img") {
    let directURL = url[1];
    openImgInCanvas(directURL);
  }
}

//==============================================================================
// generate grid
function buildGrid(event) {
  $('#grid').empty();
  event.preventDefault();

  $('#show-me').addClass("grey-text");

  let dimension = document.getElementById('grid-size').value;
  dimension = Number(dimension);

  let $grid = $('#grid');

  if (typeof dimension === "number" && dimension >= 30 && dimension <= 50) {
    var height = dimension;
    var width = dimension;
  } else {
    var height = 40;
    var width = 40;
  }

  $("#grid").css("width", width * 10 + 2);
  $("#grid").css("height", height * 10 + 2);
  $("#grid").addClass("border");
  $("#grid").addClass("z-depth-2");

  for (let row = 0; row < height; row++) {
    let $row = $('<div class="grid-row">');

    for (let col = 0; col < width; col++) {
      let $pixel = $('<div class="pixel">');
      $pixel.css("width", 10);
      $pixel.css("height", 10);

      $pixel.appendTo($row);
    }
    $row.appendTo($grid);
  }

  document.getElementById('grid-size').value = "";
}

//==============================================================================
// set the pallet colors and add event listener - allows for passing various pallets
function buildColorPallet(colors) {
  if (colors === undefined){
    colors = ['maroon', 'brown','red', 'orange', 'gold', 'yellow', 'olive',
    'green', 'lime', 'navy', 'blue', 'cyan', 'purple', 'fuchsia',
    'violet', 'indigo', 'teal', 'silver', 'black', 'gray', 'white'];
  }

  let $pallet = $('#pallet');

  let numColors = colors.length;

  for (let i = 0; i < numColors; i++) {
    let $inkWell = $('<div class="pallet-color">');

    $inkWell.appendTo($pallet);
  }

  $('#pallet').addClass("z-depth-2");
  $("#current-color").addClass("z-depth-2");

  let palletArray = document.getElementsByClassName('pallet-color');

  for (let i = 0; i < numColors; i++) {
    palletArray[i].style.backgroundColor = colors[i];
  }

  let pallet = document.getElementById('pallet');
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
  let colorIndicator = document.getElementById('current-color');
  colorIndicator.style.backgroundColor = brushColor;
}

//==============================================================================
// add event listener to the grid
function activateGrid() {
  let grid = document.getElementById('grid');
  grid.addEventListener('click', clickGridHandler);
  grid.addEventListener('mousedown', mDownHandler);
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

//==============================================================================
// event handler for painting events mouseover and mouseup
function mDownHandler(event) {
  if (event.target === event.currentTarget) {
    return;
  }

  grid.addEventListener('mouseup', mUpHandler);
  grid.addEventListener('mouseover', paintRoller);
}

//==============================================================================
// remove the painting event listener
function mUpHandler() {
  grid.removeEventListener('mouseover', paintRoller);
}

//==============================================================================
// event handler to paint pixels that the mouse passes over
function paintRoller(event) {
  if (event.target === event.currentTarget) {
    return;
  }

  setPixelColor(event.target);
}
