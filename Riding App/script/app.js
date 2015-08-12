var app = (function(global){
    
    var onDeviceReady = function()
    {
    };
    
    document.addEventListener("deviceready",onDeviceReady,false);
    var mobileApp = new kendo.mobile.Application(document.body,
                                                                {
                                                                    skin:'flat',
                                                                    layout:'main-layout',
                                                                    initial:'views/home.html'
                                                                }
    );
    
    return {
      mobileApp : mobileApp  
    };
}(window));