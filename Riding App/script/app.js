var app = (function(global){
    
    var onDeviceReady = function()
    {
        window.cameraInfo = new cameraApp();
    };
    
    function cameraApp() { }
    
    cameraApp.prototype = {
        capturePhoto: function ()
        {
            var that = this;
            navigator.camera.getPicture(that.successCallback, that.errorCallback, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA
            });
        },

        successCallback: function (imageData)
        {
            var uploadimgbtn = document.getElementById('uploadimgbtn');
            uploadimgbtn.src = "data:image/jpeg;base64," + imageData;

            $('#updbtn').css({ 'display': 'block', 'margin': '0px auto'});
           // $('#dftbtn').css('display', 'none');
            sessionStorage.setItem("image64Code", imageData);
        },

        errorCallback: function (message)
        {
            alert(message);
        },
        
        recievePhoto:function()
        {
            var that = this;
            navigator.camera.getPicture(that.successCallback, that.errorCallback, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            });
        },
        
        successCallback: function (imageData)
        {
            alert(imageData);
           /* var uploadimgbtn = document.getElementById('uploadimgbtn');
            uploadimgbtn.src = "data:image/jpeg;base64," + imageData;

            $('#updbtn').css({ 'display': 'block', 'margin': '0px auto'});
           // $('#dftbtn').css('display', 'none');
            sessionStorage.setItem("image64Code", imageData);*/
        },

        errorCallback: function (message)
        {
            alert(message);
        },
    }
    
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