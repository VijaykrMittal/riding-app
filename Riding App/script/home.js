(function(global){
    var homeViewModel,
        app = global.app = global.app || {};
    
    homeViewModel = kendo.data.ObservableObject.extend({
        
        show: function()
        {
            //alert("ok");
            $(".midDiv").css('height',$(window).height()-98);
        },
        offerRide:function()
        {
            app.mobileApp.navigate('views/offerride.html');
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