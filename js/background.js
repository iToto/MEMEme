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

    that = this;

    that.alreadyFavorited_ = function (url, favorites) {
        if (favorites) {
            for(var i = 0, len = favorites.length; i < len; i++) {
                if(favorites[i].image === url) {
                    return i;
                }
            }
        }
        return -1;
    };

    that.saveFavorite = function(url){
        var favorite  = {"image": url};
        that.getFavorites(function(results){
            results = results || [];
            if (that.alreadyFavorited_(url, results) < 0) {
                results.push(favorite);
                chrome.storage.sync.set({"favorites" : results});
            }
        });
    };

    that.getFavorites = function(fn){
        chrome.storage.sync.get("favorites", function(items) {
            fn(items.favorites);
        });
    };

    that.deleteFavorite = function(url){
        that.getFavorites(function(results){
            results = results || [];
            index = that.alreadyFavorited_(url, results);
            if (index >= 0) {
                results.splice(index,1);
                chrome.storage.sync.set({"favorites" : results});
                return true;
            }
            return false;
        });
    };
}