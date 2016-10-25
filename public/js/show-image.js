"use-strict";
/* jshint esversion: 6 */
/* jshint devel:true */
/* jshint node: true */

//==============================================================================
// opens retrieved image in HTML Canvas element
function openImgInCanvas(imageURL) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  let img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);

    let pixelationInfo = createPixelationInfo(ctx, img.width, img.height);
    buildPixelatedImg(pixelationInfo);
  };

  img.src = imageURL;
}

//==============================================================================
// generates pixelated image as divs
function buildPixelatedImg(pixelationInfo) {
  let imgData   = pixelationInfo[0];
  let blockSize = 10; // forces it to fit into my browser window
  let numCols   = pixelationInfo[2];
  let numRows   = pixelationInfo[3];

  let $grid = $('#grid');
  $('#grid').empty();
  $('#show-me').addClass("grey-text");

  $("#grid").css("width", blockSize * numCols + 2);
  $("#grid").css("height", blockSize * numRows + 2);
  $("#grid").addClass("z-depth-2");
  $("#grid").addClass("border");

  let blockNum = 0;

  for (let row = 0; row < numRows; row++) {
    let $row = $('<div class="grid-row">');

    for (let col = 0; col < numCols; col++) {
      let $block = $('<div class="block">');
      let red =   imgData[blockNum][0];
      let green = imgData[blockNum][1];
      let blue =  imgData[blockNum][2];

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
  let averagedBlocks = [];
  let avgBlockColor = "";
  let numBlocks = 50;
  let blockSize = 0;
  let numRows = 0;
  let numCols = 0;

  if (width > height) {
    blockSize = Math.floor(width / numBlocks);
    numCols = numBlocks;
    numRows = Math.floor(height / blockSize);
  } else {
    blockSize = Math.floor(height / numBlocks);
    numRows = numBlocks;
    numCols = Math.floor(width / blockSize);
  }

  for (let row = 0; row < numRows; row++) {

    for (let col = 0; col < numCols; col++) {
      let imgd = ctx.getImageData(col * blockSize, row * blockSize, blockSize, blockSize);
      let blockData = imgd.data;

      avgBlockColor = getAvgBlockColor(blockData);
      averagedBlocks.push(avgBlockColor);
    }
  }

  return [averagedBlocks, blockSize, numCols, numRows];
}

//==============================================================================
// calculates average color for a block of image pixels - booyah part 1!
function getAvgBlockColor(blockData) {
  let red = green = blue = i = count = 0;
  let length = blockData.length;

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
