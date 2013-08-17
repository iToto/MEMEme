// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 *
 * @type {string}
 */
// var tumblr = require('tumblr.js');

var imageGenerator = {

  searchTagOnTumblr_: function(searchTerm){
      return 'http://api.tumblr.com/v2/tagged?' +
      'tag=' + encodeURIComponent(searchTerm) + '&' +
      'api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&' +
      'limit=20'
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
    var rand = results[Math.floor(Math.random() * results.length)];
    if (rand.photos){
      var imgLink = rand.photos[0].alt_sizes[0].url;
    }
    if (imgLink){
      var img = document.createElement('img');
      img.src = imgLink;
      $('#test').append(img);
      $('#test').slideDown('fast');
    }
  }

};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  $('#searchTerm').keyup(function(e){
    if(e.keyCode == 13)
    {
      $('#test').empty();
      imageGenerator.requestTumblrTag($('#searchTerm').val());
    }
  });
});
