(function() {
  'use strict';

  var images = [];

  var renderImages = function() {
    $('#listings').empty();

    for (var image of images) {
      var $col = $('<div class="col s6 m4">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': image.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(image.title);

      var $picture = $('<img class="picture">');

      $picture.attr({
        src: image.thumbURL,
        alt: `${image.thumbURL}`
      });

      $content.append($title, $picture);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $selected = $('<a class="waves-effect waves-light btn modal-trigger">');

      $selected.attr('href', `api_index.html?img=${image.imageURL}`);
      $selected.text('Select');

      $action.append($selected);
      $card.append($action);

      var $modal = $(`<div id="${image.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(image.title);

      $modalContent.append($modalHeader);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // MAIN
  window.onload = function() {
    document.getElementsByTagName('button')[0].addEventListener('click', doAjax);
  }

  function doAjax(event) {
    event.preventDefault();

    // The object we use to start the AJAX request using JQuery's format
    let requestObject = {
      url: `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5b7fd66b51d24258c6135f2647adfb3f&extras=url_q,url_c&per_page=30&format=json&nojsoncallback=1`,
      method: "GET",
      success: handleSuccess,
      error: handleError
    };

    // Actually start the AJAX request
    $.ajax(requestObject);
  }

  // The event handler for a successful ajax request, used in doAjax
  function handleSuccess(data) {
    let imageArray = data["photos"]["photo"];

    var Image = function(id, height, width, owner, title, server, farm, secret, thumbURL, imageURL) {
      this.id = id || "";
      this.height = Number(height) || 0;
      this.width = Number(width) || 0;
      this.owner = owner || "";
      this.title = title || "Untitled";
      this.server = server || "";
      this.farm = farm || 0;
      this.secret = secret || "";
      this.thumbURL = thumbURL || "";
      this.imageURL = imageURL || "";
    }

    for (var i = 0; i < imageArray.length; i++) {
      var imageElement = new Image (imageArray[i].id, imageArray[i].height_c,
        imageArray[i].width_c, imageArray[i].owner,
        imageArray[i].title, imageArray[i].server, imageArray[i].farm,
        imageArray[i].secret, imageArray[i].url_q, imageArray[i].url_c);

      console.log(imageElement);

      if (imageArray[i].height_c > 0 || imageArray[i].width_c > 0) {
        images.push(imageElement);
      }
    }
    console.log(imageArray.length, images.length);
    renderImages();
  }

  // The event handler for a failed ajax request, used in doAjax
  function handleError(err) {
    console.log("AJAX FAILURE, WILL ROBINSON! FAILURE!");
    console.log(err);
  }

})();
