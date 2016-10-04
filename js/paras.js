"use strict"

window.onload = function () {
  var colorsArr = ['white', 'yellow', 'fuchsia', 'red', 'silver', 'gray', 'olive', 'purple', 'maroon', 'aqua', 'lime', 'teal', 'green', 'blue', 'navy', 'black'];
  var brush = "";
//Function for building the pallete
function palleteBuild(colors) {
  var pallete = document.getElementById("pallete");
  for (let i = 0; i < colors.length; i++) {
    var palleteDiv = document.createElement("div");
    palleteDiv.className = "colorBtn";
    palleteDiv.style.background = colors[i];
    palleteDiv.setAttribute("title", colors[i]);
    pallete.appendChild(palleteDiv);
  }
}
palleteBuild(colorsArr);

//Function for building the canvas
function canvasBuild() {
  var canvas = document.getElementById("canvas");
  console.log(canvas);
  for (let i = 0; i < 3713; i++) {
    var canvasDiv = document.createElement("div");
    canvasDiv.className = "pxl";
    canvas.appendChild(canvasDiv);
  }
}
canvasBuild();

//Function for selecting a color from the pallete
  function colorSelection() {
    var colorOption = document.querySelectorAll(".colorBtn");
    var clickAction = function() {
      // console.log(this);
      brush = this.getAttribute("title");
    };
    var selectedColor = function() {
      for (let i = 0; i < colorOption.length; i++) {
        colorOption[i].classList.remove("colorBtnClicked");
      }
      this.classList.add("colorBtnClicked");
    }
    for (let i = 0; i < colorOption.length; i++) {
      colorOption[i].addEventListener("click",clickAction);
      colorOption[i].addEventListener("click",selectedColor);
    }
  }
  colorSelection();

  //Function for changing the color of pxl with click
  function paintSelection() {
    var canvasPxl = document.querySelectorAll(".pxl");
    //var for click and paint
    var pxlClick = function () {
      console.log("The brush is " + brush);
      this.style.background = brush;
      this.style.borderColor = brush;
    }

    //function for click and hover events
    function pxlClickHover() {
      for (let i = 0; i < canvasPxl.length; i++) {
        canvasPxl[i].addEventListener("mouseup", pxlRemoveHover);
        canvasPxl[i].addEventListener("mouseover", pxlHover);
      }
    }

    //function for hover events
    function pxlHover() {
        this.style.background = brush;
        this.style.borderColor = brush;
    }

    // function for click and hover removal events
    function pxlRemoveHover() {
      for (let i = 0; i < canvasPxl.length; i++) {
        canvasPxl[i].removeEventListener("mouseover", pxlHover);
      }
    }

    for (let i = 0; i < canvasPxl.length; i++) {
      canvasPxl[i].addEventListener("click",pxlClick);
      canvasPxl[i].addEventListener("mousedown", pxlClickHover);
    }

  }
  paintSelection();

};
