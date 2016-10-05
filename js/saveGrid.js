"use strict"

function serializeGrid() {
  event.preventDefault();

  let fileName = document.getElementById('file-name').value;

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

  console.log(JSON.stringify(grid));

  localStorage.setItem(fileName, JSON.stringify(grid));

  document.getElementById('file-name').value = "";
}

// Retrieve the object from storage - assumed to be square for now
function deserializeGrid() {
  event.preventDefault();

  let fileName = document.getElementById('file-name').value;
  var retrievedObject = localStorage.getItem(fileName);
  var parsedObject = JSON.parse(retrievedObject);

  console.log('retrievedObject: ', parsedObject);

  var $grid = $('#grid');
  var dimension = Math.sqrt(parsedObject.length);

  // for (let row = 0; row < dimension; row++) {
  //   var $currentPixel = $($currentRow.children()[0]);
  //
  //   for (let col = 0; col < dimension; col++) {
  //     var borderColor = $currentPixel.css('border-color');
  //     var bgColor = $currentPixel.css('background-color');
  //
  //     var pixelElement = new PixelBox(row, col, borderColor, bgColor);
  //     grid.push(pixelElement);
  //
  //     $currentPixel = $currentPixel.next();
  //   }
  //
  //   $currentRow = $currentRow.next();
  // }

  document.getElementById('file-name').value = "";
}
