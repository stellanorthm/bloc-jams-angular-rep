(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          /**
          * @desc Get the current album
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

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
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
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
 * @function getSongIndex
 * @desc Gets the index of current song
 */
var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };

/**
* @desc Currently paying song
* @type {Object} song
*/
SongPlayer.currentSong = null;


/**
* @function play
* @desc Play current or new song
* @param {Object} song
*/
SongPlayer.play = function(song) {
    song = song || SongPlayer.currentSong;
    if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            playSong(song);
        }
   }
};

/**
* @function pause
* @desc Pause current song
* @param {Object} song
*/
SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
};

/**
* @function previous
* @desc Selects the previous song
* @param {Object} song
*/
SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;

     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
