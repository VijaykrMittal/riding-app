(function(global){
    var step3ViewModel,
        app = global.app = global.app || {};
    
    step3ViewModel = kendo.data.ObservableObject.extend({
        vechicleName:'',
        
        show: function()
        {
            //app.step3.viewModel.registervehicle(sessionStorage.getItem("vehicleSelect"));
            $('#vechicleName').text(sessionStorage.getItem("vehicleSelect"));
        },
        
        registervehicle:function()
        {
            var data = sessionStorage.getItem("vehicleSelect");
            if(data === 'bike')
            {
                
                $('.addmoreBtn').css('display','none');
                $('.addcarDv').css('display','none');
                $('.addbikeDv').slideDown("slow");
                $('.addbusDv').css('display','none');
            }
            
            if(data === 'bus')
            {
                $('.addmoreBtn').css('display','none');
                $('.addcarDv').css('display','none');
                $('.addbikeDv').css('display','none');
                $('.addbusDv').slideDown("slow");
            }
            
            if(data === 'car')
            {
                $('.addmoreBtn').css('display','none');
                $('.addcarDv').slideDown("slow");
                $('.addbikeDv').css('display','none');
                $('.addbusDv').css('display','none');
            }
        },
        
        finalStepProcess : function()
        {
            window.cameraInfo.recievePhoto();
        }
    });
    
    app.step3 = {
        viewModel : new step3ViewModel()
    };
    
})(window);