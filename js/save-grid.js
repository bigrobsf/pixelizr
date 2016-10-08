"use strict"

//==============================================================================
// save grid data to local storage
function serializeGrid() {
  event.preventDefault();

  let fileName = document.getElementById('save-name').value;

  let grid = [];

  var PixelBox = function(row, col, borderColor, bgColor) {
    this.row = row;
    this.col = col;
    this.borderColor = borderColor;
    this.bgColor = bgColor;
  }

  let numRows = $("#grid .grid-row").length;
  let numCols = $("div.grid-row").first().children().length;

  var $currentRow = $($('#grid').children()[0]);

  for (let row = 0; row < numRows; row++) {
    var $currentPixel = $($currentRow.children()[0]);

    for (let col = 0; col < numCols; col++) {
      var borderColor = $currentPixel.css('border-color');
      var bgColor = $currentPixel.css('background-color');

      var pixelElement = new PixelBox(row, col, borderColor, bgColor);
      grid.push(pixelElement);

      $currentPixel = $currentPixel.next();
    }

    $currentRow = $currentRow.next();
  }

  var jsonGrid = JSON.stringify(grid);

  localStorage.setItem(fileName, JSON.stringify(grid));

  document.getElementById('save-name').value = "";
}

//==============================================================================
// retrieve grid data from local storage
function deserializeGrid() {
  event.preventDefault();

  let fileName = document.getElementById('open-name').value;
  var retrievedObject = localStorage.getItem(fileName);
  var parsedObject = JSON.parse(retrievedObject);

  var lastObject = parsedObject[parsedObject.length - 1];
  var numRows = lastObject.row + 1;
  var numCols = lastObject.col + 1;

  var $grid = $('#grid');
  $('#grid').empty();

  var dimension = Math.sqrt(parsedObject.length);

  $("#grid").css("width", 10 * numCols + 2);
  $("#grid").css("height", 10 * numRows + 2);
  $("#grid").addClass("z-depth-2");
  $("#grid").addClass("border");

  var objectNum = 0;

  for (let row = 0; row < numRows; row++) {
     var $row = $('<div class="grid-row">');

    for (let col = 0; col < numCols; col++) {
      var $pixel = $('<div class="pixel">');

      var borderColor = parsedObject[objectNum].borderColor;
      var bgColor = parsedObject[objectNum].bgColor;

      $pixel.css('border-color', borderColor);
      $pixel.css('background-color', bgColor);

      $pixel.appendTo($row);
      objectNum++;
    }

    $row.appendTo($grid);
  }

  document.getElementById('open-name').value = "";
}