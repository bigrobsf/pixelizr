"use-strict";

//==============================================================================
// opens retrieved image in HTML Canvas element
function openImgInCanvas(imageURL) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);

    var pixelationInfo = createPixelationInfo(ctx, img.width, img.height);
    buildPixelatedImg(pixelationInfo);
  }

  img.src = imageURL;
}

//==============================================================================
// generates pixelated image as divs
function buildPixelatedImg(pixelationInfo) {
  var imgData   = pixelationInfo[0];
  var blockSize = 10; // forces it to fit into my browser window
  var numCols   = pixelationInfo[2];
  var numRows   = pixelationInfo[3];

  var $grid = $('#grid');
  $('#grid').empty();

  $("#grid").css("width", blockSize * numCols + 2);
  $("#grid").css("height", blockSize * numRows + 2);
  $("#grid").addClass("z-depth-2");
  $("#grid").addClass("border");

  var blockNum = 0;

  for (var row = 0; row < numRows; row++) {
    var $row = $('<div class="grid-row">');

    for (var col = 0; col < numCols; col++) {
      var $block = $('<div class="block">');
      var red =   imgData[blockNum][0];
      var green = imgData[blockNum][1];
      var blue =  imgData[blockNum][2];

      $block.css("background-color", 'rgb(' + red + ',' + green + ',' + blue + ')');
      $block.css("border-color", 'rgb(' + red + ',' + green + ',' + blue + ')');
      $block.css("width", blockSize);
      $block.css("height", blockSize);

      $block.appendTo($row);
      blockNum++;
    }

    $row.appendTo($grid);
  }
}

//==============================================================================
// iterates through all blocks of the calculated number of pixels - booyah part 2!
function createPixelationInfo(ctx, width, height) {
  var averagedBlocks = [];
  var avgBlockColor = "";
  var numBlocks = 50;
  var blockSize = 0;
  var numRows = 0;
  var numCols = 0;

  if (width > height) {
    blockSize = Math.floor(width / numBlocks);
    numCols = numBlocks;
    numRows = Math.floor(height / blockSize);
  } else {
    blockSize = Math.floor(height / numBlocks);
    numRows = numBlocks;
    numCols = Math.floor(width / blockSize);
  }

  for (var row = 0; row < numRows; row++) {

    for (var col = 0; col < numCols; col++) {
      var imgd = ctx.getImageData(col * blockSize, row * blockSize, blockSize, blockSize);
      var blockData = imgd["data"];

      avgBlockColor = getAvgBlockColor(blockData);
      averagedBlocks.push(avgBlockColor);
    }
  }

  return [averagedBlocks, blockSize, numCols, numRows];
}

//==============================================================================
// calculates average color for a block of image pixels - booyah part 1!
function getAvgBlockColor(blockData) {
  var red = green = blue = i = count = 0;
  var length = blockData.length;

  while (i < length) {
    red   += blockData[i];
    green += blockData[i + 1];
    blue  += blockData[i + 2];
    i += 4; // skip alpha channel, get next red value
    count++;
  }

  red   = Math.floor(red / count);
  green = Math.floor(green / count);
  blue  = Math.floor(blue / count);

  return [red, green, blue];
}
