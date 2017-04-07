(function() {
     function SongPlayer($rootScope, Fixtures) {
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
 * @function playSong
 * @desc Play the current Buzz object & set the playing song property to true
 */
var playSong = function(song){
  currentBuzzObject.play();
  song.playing = true;
};

/**
 * @function stopSong
 * @desc Stop the current Buzz object & set the playing song property to null
 */
var stopSong = function(song){
  currentBuzzObject.stop();
  song.playing = null;
};

/**
 * @function getSongIndex
 * @desc Gets the index of current song
 */
var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };

/**
* @desc Currently selected song
* @type {Object} song
*/
SongPlayer.currentSong = null;

/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;

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
         stopSong(song);
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

 /**
 * @function next
 * @desc Selects the next song
 * @param {Object} song
 */
 SongPlayer.next = function() {
      var currentSongInd = getSongIndex(SongPlayer.currentSong);
      currentSongInd++;

      if (currentSongInd < 0) {
          stopSong(song);
      } else {
          var song = currentAlbum.songs[currentSongInd];
          setSong(song);
          playSong(song);
      }
  };


  /**
  * @function mute
  * @desc Sets the song to mute and set mute property to true
  * @param {Object} song
  */
  SongPlayer.mute = function() {
    currentBuzzObject.mute();
    song.mute = true;
   };

   /**
   * @function unMute
   * @desc Sets the song to unmute and set mute property to false
   * @param {Object} song
   */
   SongPlayer.unMute = function() {
     currentBuzzObject.unmute();
     song.mute = false;
    };





  /**
        * @function setCurrentTime
        * @desc Sets the current time in current song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
     * @function setVolume
     * @desc Set volume of the song player
     * @param {Number} volume
     */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume)
      }
    };

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

       currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
          var total = currentBuzzObject.getDuration();
          if(SongPlayer.currentTime === total){
            SongPlayer.next();
          }
          });
      });

       SongPlayer.currentSong = song;
    };


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
