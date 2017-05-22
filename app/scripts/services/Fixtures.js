(function() {
    function Fixtures() {
    var Fixtures = {};

    var albumPower = {
        title: 'The Power Is YOURS!',
        artist: 'Doctor Pain',
        label: 'MTV',
        year: '1086 -',
        albumArtUrl: '/assets/images/album_covers/01.png',
        songs: [
            { title: 'Highlander', duration: '166', audioUrl: '/assets/music/highlander' },
            { title: 'Full House', duration: '106', audioUrl: '/assets/music/fullHouse' },
            { title: 'Afternoon Everybody!', duration: '93', audioUrl: '/assets/music/afternoonEverybody' },
            { title: 'Do the Mario!', duration: '163', audioUrl: '/assets/music/doTheMario' },
            { title: 'Orange you smart?', duration: '146', audioUrl: '/assets/music/orangeYouSmart' }
        ]
    };

    var albumMarconi = {
        title: 'The Telephone',
        artist: 'Guglielmo Marconi',
        label: 'EM',
        year: '1909',
        albumArtUrl: '/assets/images/album_covers/20.png',
        songs: [
            { title: 'Hello, Operator?', duration: '1:01' },
            { title: 'Ring, ring, ring', duration: '5:01' },
            { title: 'Fits in your pocket', duration: '3:21' },
            { title: 'Can you hear me now?', duration: '3:14' },
            { title: 'Wrong phone number', duration: '2:15' }
        ]
    };

    Fixtures.getAlbum = function() {
         return albumPower;
     };

     var numberOfAlbums = [albumPower];

     Fixtures.getCollection = function() {
       var array = [];
       for (var i = 0; i < numberOfAlbums.length; i++) {
         array.push(numberOfAlbums[i]);
       }
       return array;
      };

         return Fixtures;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
