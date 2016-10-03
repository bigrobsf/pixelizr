(function() {
  'use strict';

  var images = [];

  var renderImages = function() {
    $('#listings').empty();

    for (var image of images) {
      var $col = $('<div class="col s6">');
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
        src: image.picture,
        alt: `${image.picture} Picture`
      });

      $content.append($title, $picture);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $selected = $('<a class="waves-effect waves-light btn modal-trigger">');

      $selected.attr('href', `#${image.id}`);
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
      url: `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=5b7fd66b51d24258c6135f2647adfb3f&per_page=10&format=json&nojsoncallback=1`,
      method: "GET",
      success: handleSuccess,
      error: handleError
    };

    // Actually start the AJAX request
    $.ajax(requestObject);
  }
  // The event handler for a successful ajax request, used in doAjax
  function handleSuccess(data) {
    console.log(data);
    let imageArray = data["photos"]["photo"];

    images = [];

    var Image = function(id, owner, title) {
      this.id = id || "";
      this.owner = owner || "";
      this.title = title || "";
    }

    for (var i = 0; i < imageArray.length; i++) {
      var imageElement = new Image (imageArray[i].id, imageArray[i].owner,
        imageArray[i].title);

      images.push(imageElement);

    }

    renderImages();
  }

  // The event handler for a failed ajax request, used in doAjax
  function handleError(err) {
    console.log("FAILURE, BITCH! FAILURE!");
    console.log(err);
  }

})();
