"use strict"

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
    console.log(borderColor, bgColor);
  }

  console.log(JSON.stringify(grid));
  var jsonGrid = JSON.stringify(grid);

  localStorage.setItem(fileName, JSON.stringify(grid));

  document.getElementById('save-name').value = "";
}

// Retrieve the object from storage - assumed to be square for now
function deserializeGrid() {
  event.preventDefault();

  let fileName = document.getElementById('open-name').value;
  var retrievedObject = localStorage.getItem(fileName);
  var parsedObject = JSON.parse(retrievedObject);

  var lastObject = parsedObject[parsedObject.length - 1];
  var numRows = lastObject.row + 1;
  var numCols = lastObject.col + 1;
  console.log(lastObject, numRows, numCols);


  var $grid = $('#grid');
  $('#grid').empty();

  var dimension = Math.sqrt(parsedObject.length);

  $("#grid").css("width", 10 * numCols + 2);
  $("#grid").css("height", 10 * numRows + 2);

  $("#grid").addClass("border");

  var objectNum = 0;

  for (let row = 0; row < numRows; row++) {
     var $row = $('<div class="grid-row">');

    for (let col = 0; col < numCols; col++) {
      var $pixel = $('<div class="pixel">');

      var borderColor = parsedObject[objectNum].borderColor;
      var bgColor = parsedObject[objectNum].bgColor;

      if (borderColor !== bgColor) {
        // borderColor = "rgb(221, 221, 221)";
        borderColor = bgColor;
      }

      $pixel.css('border-color', borderColor);
      $pixel.css('background-color', bgColor);

      $pixel.appendTo($row);
      objectNum++;
    }

    $row.appendTo($grid);
  }
  // console.log(parsedObject.length, objectsNum);

  document.getElementById('open-name').value = "";
}
