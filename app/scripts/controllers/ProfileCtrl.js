(function() {
    function ProfileCtrl() {
        this.heroTitle = "Turn the Music Up!";
        this.heroTitle2 = "Artists and Jams You Love";
    };

    angular
        .module('blocJams')
        .controller('ProfileCtrl', ProfileCtrl);
})();
