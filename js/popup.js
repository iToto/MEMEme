// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var QUERY  = 'kittens';
// var tumblr = require('tumblr.js');

var kittenGenerator = {
  /**
   * Tumblr URL that will give us lots and lots of whatever we're looking for.
   *
   * @type {string}
   * @private
   */
  searchTagOnTumblr_: function(searchTerm){
      return 'http://api.tumblr.com/v2/tagged?' +
      'tag=' + encodeURIComponent(searchTerm) + '&' +
      'api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&' +
      'limit=1'
      },


  /**
   * Sends an XHR GET request to grab search results for a tag on tumblr
   *
   * @public
   */
  requestTumblrTag: function(searchTerm) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.searchTagOnTumblr_(searchTerm), true);
    var stupidThis = this;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        stupidThis.loadTumblrImages_(resp);
      }
    }
    xhr.send();
  },

  /**
   * Handle the 'onload' event of the Tumblr search request. This should parse
   * the JSON return object and load the image in the view
   */
  loadTumblrImages_: function(result) {
    // var resp = JSON.parse(result.responseText);
    var results = result.response;
    for (var i = 0; i < results.length; i++){
        console.dir(results[i]);
        if (results[i].photos){
          var imgLink = results[i].photos[0].alt_sizes[0].url;
        }
        if (imgLink){
            var img = document.createElement('img');
            img.src = imgLink;
            img.setAttribute('alt', i);
            $('#test').append(img);
        }
    }
    $('#test').slideDown('fast');
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var kittens = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < kittens.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructKittenURL_(kittens[i]);
      img.setAttribute('alt', kittens[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  $('#searchTerm').keyup(function(e){
    if(e.keyCode == 13)
    {
      $('#test').empty();
      kittenGenerator.requestTumblrTag($('#searchTerm').val());
    }
  });
});
