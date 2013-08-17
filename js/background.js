/**
 * background.js
 *
 * The persistent background javascript file
 *
 * @package     MEMEme
 * @author      Salvatore D'Agostino
 * @copyright   Copyright (c) 2013, Salvatore D'Agostino
 **/

/**
 * Class Favorite Defn'
 *
 * {
 *     "image": "URL"
 * }
 */


/**
 * Favorites Class
 *
 * This class handles creating and getting favorites
 * @author Salvatore D'Agostino
 * @date 08/17/13
 * @param url The URL of the image to add to favorites
 */
function Favorites(){

    saveFavorite: function(url){
        var favorite  = {"image":url};
        var favorites = this.getFavorites();
        favorites.push(favorite);
        chrome.storage.StorageArea.set('favorites',favorites);
    },



    getFavorites: function(){
        return chrome.storage.StorageArea.get('favorites', function(object items) {
            return items;
        });
    },
}