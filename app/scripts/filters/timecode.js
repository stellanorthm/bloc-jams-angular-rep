(function() {
    function timecode() {
        return function(seconds) {

          var output = buzz.toTimer(seconds).slice(1);

            return output;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
