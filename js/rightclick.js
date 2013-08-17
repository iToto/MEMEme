(function(){
  /*global console */
  /*global chrome */
  /*global Favorites */
  "use strict";

  function onClickHandler(info, tab) {
    if(info.mediaType == "image") {
      if(info.srcUrl) {
        var favorites = new Favorites();
        favorites.saveFavorite(info.srcUrl);
        favorites.getFavorites(function(result){
          console.log(result);
        });
        console.log(info.srcUrl);
      }
    }
  }

  chrome.contextMenus.onClicked.addListener(onClickHandler);
  chrome.runtime.onInstalled.addListener(function() {
    var contexts = ["image"];
    for (var i = 0; i < contexts.length; i++) {
      var context = contexts[i];
      var title = "Save image";
      chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
    }
    chrome.contextMenus.create({"title": "Save image", "id": "parent"});
  });
})();
