function onClickHandler(info, tab) {
  if(info.mediaType == "image") {
    console.log(info.srcUrl);
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.runtime.onInstalled.addListener(function() {
  var contexts = ["image"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Save image";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
  }
  chrome.contextMenus.create({"title": "Save image", "id": "parent"});
});