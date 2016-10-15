"use strict"

//==============================================================================
// save grid data to local storage
function serializeGrid(event) {
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

  let $currentRow = $($('#grid').children()[0]);

  for (let row = 0; row < numRows; row++) {
    let $currentPixel = $($currentRow.children()[0]);

    for (let col = 0; col < numCols; col++) {
      let borderColor = $currentPixel.css('border-bottom-color');

      let bgColor = $currentPixel.css('background-color');

      console.log("border: ", borderColor, "bg: ", bgColor);

      let pixelElement = new PixelBox(row, col, borderColor, bgColor);
      grid.push(pixelElement);

      $currentPixel = $currentPixel.next();
    }

    $currentRow = $currentRow.next();
  }

  let jsonGrid = JSON.stringify(grid);
  console.log(grid);

  localStorage.setItem(fileName, JSON.stringify(grid));

  document.getElementById('save-name').value = "";
}

//==============================================================================
// retrieve grid data from local storage
function deserializeGrid(event) {
  event.preventDefault();

  let fileName = document.getElementById('open-name').value;
  let retrievedObject = localStorage.getItem(fileName);
  let parsedObject = JSON.parse(retrievedObject);

  let lastObject = parsedObject[parsedObject.length - 1];
  let numRows = lastObject.row + 1;
  let numCols = lastObject.col + 1;

  let $grid = $('#grid');
  $('#grid').empty();

  let dimension = Math.sqrt(parsedObject.length);

  $("#grid").css("width", 10 * numCols + 2);
  $("#grid").css("height", 10 * numRows + 2);
  $("#grid").addClass("z-depth-2");
  $("#grid").addClass("border");

  let objectNum = 0;

  for (let row = 0; row < numRows; row++) {
     let $row = $('<div class="grid-row">');

    for (let col = 0; col < numCols; col++) {
      let $pixel = $('<div class="pixel">');

      let borderColor = parsedObject[objectNum].borderColor;
      let bgColor = parsedObject[objectNum].bgColor;

      $pixel.css('border-color', borderColor);
      $pixel.css('background-color', bgColor);

      $pixel.appendTo($row);
      objectNum++;
    }

    $row.appendTo($grid);
  }

  document.getElementById('open-name').value = "";
}
