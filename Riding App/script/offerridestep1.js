(function(global){
    var step1ViewModel,
        app = global.app = global.app || {};
    
    step1ViewModel = kendo.data.ObservableObject.extend({

        vehicle:'',
        seatavailable:'',
        error:'This is a Error',
        show: function(e)
        {
            console.log(e);
            //var dfthtml = '<option value="0">Seat Availablity</option>';
           // $('#seatAvailable').html(dfthtml);
            
            $('#seatAvailable').attr('disabled',true);
            $('#vehicleType').val(0);
            $('#seatAvailable').val(0);
        },
        
        seatAvailablity : function(data)
        {
            sessionStorage.setItem("vehicleSelect",data);
            
            if(data === 'bike')
            {
                app.step1.viewModel.setSeatAvailablity(1);
            }
            
            if(data === 'bus')
            {
                app.step1.viewModel.setSeatAvailablity(60);
            }
            
            if(data === 'car')
            {
                app.step1.viewModel.setSeatAvailablity(5);
            }
            
            if(data === 0 || data === "0")
            {
                $('#seatAvailable').attr('disabled',true);
                $('#seatAvailable').val();
            }
        },
        
        setSeatAvailablity :function(seat)
        {
            $('#seatAvailable').attr('disabled',false);
            
            var setHtml ="";
            setHtml = '<option>Seat Availablity</option>';
            for(var i=1;i<=seat;i++)
            {
                setHtml +='<option value="'+i+'">'+i+'</option>';
            }
            $('#seatAvailable').html(setHtml);
        },
        
        submitStepFirst : function()
        {
           /* alert("ok");
            $('#errorDv').slideDown();
            console.log(this.get('vehicle'));*/
            
            /*$('#errorDv').slideDown('slow',function(){
                    setTimeout(function(){
                        $('#errorDv').slideUp('slow');
                    },2000);
                });*/
            
            var vehicle = this.get('vehicle').trim(),
                seatAvailable = this.get('seatavailable').trim();
            
            if(vehicle === 0 || vehicle === "0" || vehicle === "")
            {
                navigator.notification.alert("Please select your Vehicle Type",function(){},"Notification","Ok");
                
            }
            else if(seatAvailable === 0 || seatAvailable === "0" || seatAvailable === "")
            {
                navigator.notification.alert("Please select your Seat available",function(){},"Notification","Ok");
            }
            else
            {
                dataParam = {};
                dataParam['vechicle'] = vehicle;
                dataParam['seatAvailable'] = seatAvailable;
                console.log(dataParam);
                app.mobileApp.navigate('views/rideOffer2.html');
            }
            
            
        }
    });
    
    app.step1 = {
        viewModel : new step1ViewModel()
    };
    
})(window);