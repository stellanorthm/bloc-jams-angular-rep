(function() {
     function SongPlayer() {
          var SongPlayer = {};

          /**
          * @desc Currently paying song
          * @type {Object} song
          */
          var currentSong = null;

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
};

/**
 * @function playSong
 * @desc Play the current Buzz object & set the playing song property to true
 */
var playSong = function(song){
  currentBuzzObject.play();
  song.playing = true;
};


/**
* @desc Play method for song
* @type {Object}
*/
SongPlayer.play = function(song) {
        if (currentSong !== song) {
             setSong(song);


             playSong(song);

        } else if (currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            currentBuzzObject.play();
          }
        }
};

/**
* @desc Pause method for song
* @type {Object}
*/
SongPlayer.pause = function(song) {
     currentBuzzObject.pause();
     song.playing = false;
 };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
