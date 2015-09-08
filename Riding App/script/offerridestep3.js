(function(global){
    var step3ViewModel,
        app = global.app = global.app || {};
    
    step3ViewModel = kendo.data.ObservableObject.extend({
        
        show: function()
        {
            
        },
        
        finalStepProcess : function()
        {
            alert("ok");
            window.cameraInfo.recievePhoto();
        }
    });
    
    app.step3 = {
        viewModel : new step3ViewModel()
    };
    
})(window);