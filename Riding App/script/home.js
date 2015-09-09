(function(global){
    var homeViewModel,
        app = global.app = global.app || {};
    
    homeViewModel = kendo.data.ObservableObject.extend({
        
        show: function()
        {
            //$("#homeView .km-content").css('height',$(window).height()-98);
        },
        offerRide:function()
        {
            app.mobileApp.navigate('views/rideOffer1.html');
        },
        findRide:function()
        {
            app.mobileApp.navigate('views/findride.html');
        }
    });
    
    app.home = {
        viewModel : new homeViewModel()
    };
    
})(window);