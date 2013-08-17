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

    this.alreadyFavorited_ = function ( url, favorites ) {
        for(var i = 0, len = favorites.length; i < len; i++) {
            if( favorites[ i ].key === url )
                return true;
        }
        return false;
    };

    this.saveFavorite = function(url){
        var favorite  = {"image": url};
        this.getFavorites(function(results){
            results = results || [];
            if (!alreadyFavorited_(url, results)) {
                results.push(favorite);
            chrome.storage.sync.set({"favorites" : results});
            }
        });
    };

    this.getFavorites = function(fn){
        chrome.storage.sync.get("favorites", function(items) {
            fn(items.favorites);
        });
    };
}