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
  song.playing = false;
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
       * @desc Volume used for songs
       * @type {Number}
       */
       SongPlayer.volume = 90;

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
			} else if (SongPlayer.currentSong == song) {
        if (currentBuzzObject == null){
          currentBuzzObject = getSongIndex(SongPlayer.currentSong);
          currentBuzzObject++;
          var song = currentAlbum.songs[currentBuzzObject];
          setSong(song);
        }
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
      console.log(currentSongInd);
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
  * @function toggleMute
  * @desc Sets the song to mute or unmute
  * @param {Object} song
  */
  SongPlayer.toggleMute = function() {
    if (currentBuzzObject.isMuted()){
      currentBuzzObject.unmute();
      SongPlayer.currentSong.muted = false;
      } else {
      currentBuzzObject.mute();
      SongPlayer.currentSong.muted = true;
      }
   };


   /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
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


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
