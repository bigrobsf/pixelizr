"use strict";

// MAIN
window.onload = function main() {
  buildColorPallet(undefined);

  document.getElementById('new-btn').addEventListener('click', buildGrid);
  document.getElementById('save-btn').addEventListener('click', serializeGrid);
  document.getElementById('open-btn').addEventListener('click', deserializeGrid);
  document.getElementById('browse-btn').addEventListener('click', function(){
    window.open("file:///Users/rob/Documents/workspace/projects/pixelizr/api_call.html","");
  });

  checkAndBuildPxlImg();

  activateGrid();
};

let brushColor = 'white';

function checkAndBuildPxlImg(){
  var url = window.location.search.split('=');
  if(url[0] === "?img"){
    var directURL = url[1];
    openImgInCanvas(directURL);
  }
}

//==============================================================================
// generate grid
function buildGrid(event) {
  $('#grid').empty();
  event.preventDefault();

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

  $("#grid").css("width", function(dimension) {
    return dimension * 10;
  });
  $("#grid").css("height", function(dimension) {
    return dimension * 10;
  });

  $("#grid").addClass("border");
  $("#grid").addClass("z-depth-2");

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
    colors = ['maroon', 'brown','red', 'orange', 'gold', 'yellow', 'olive',
    'green', 'lime', 'navy', 'blue', 'cyan', 'purple', 'fuchsia',
    'violet', 'indigo', 'teal', 'silver', 'black', 'gray', 'white'];
  }

  let $pallet = $('#pallet');

  let numColors = colors.length;

  for (var i = 0; i < numColors; i++) {
    var $inkWell = $('<div class="pallet-color">');

    $inkWell.appendTo($pallet);
  }

  $('#pallet').addClass("z-depth-2");
  $("#current-color").addClass("z-depth-2");

  var palletArray = document.getElementsByClassName('pallet-color');

  for (let i = 0; i < numColors; i++) {
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
// event handler to remove the painting event listener
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
