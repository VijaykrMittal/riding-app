(function(global){
    var offerViewModel,
        app = global.app = global.app || {};
    
    var offerBindingValue;
    offerViewModel = kendo.data.ObservableObject.extend({
        
        
        show: function()
        {   
            $('#source').click(function(){
                app.offer.viewModel.sourceGoogleMap($(this).attr('id'));
            });
            
            $('#destination').click(function(){
                app.offer.viewModel.destinationGoogleMap($(this).attr('id'));
            });
            
            $('#seatAvailable').attr('disabled',true);
            $('#seatAvailable').val("0");
            
            offerBindingValue = kendo.observable({
                seatavailable:'0',
                vehicle:'0',
            });
            kendo.bind($('#stepFstForm'), offerBindingValue);
            
            $('#addStop').unbind();
            if(typeof count === 'undefined')
            {
                count = 0;
            }
            
            $('#addStop').on('click',function()
            {
                app.offer.viewModel.addStopOverFld(++count);
                sessionStorage.setItem('stopage',count);
                
                $('#stopage'+count).click(function(){
                    alert($(this).attr('id'));
                    app.offer.viewModel.stopageGoogleMap($(this).attr('id'));
                });
                
                $('.remove'+count).on('click',function(){
                   $('.removeDV'+count).remove();
                    count--;
                    sessionStorage.setItem('stopage',count);
                    if(sessionStorage.getItem('stopage')<5)
                    {
                        $("#deleteStop").css("display","none");
                        $('#addStop').css("display","block" );
                    }
                });
            });
            
            
            
            $('.returnDiv').css('display','block');
            
            $("#departdatepicker").kendoDatePicker({
                animation: {
                    close: {
                        effects: "fadeOut zoom:out",
                        duration: 300
                    },
                    open: {
                        effects: "fadeIn zoom:in",
                        duration: 300
                    }
                },
                min: new Date(),
                value:"Select Departure date"
            });
            $("#returndatepicker").kendoDatePicker({
                animation: {
                    close: {
                        effects: "fadeOut zoom:out",
                        duration: 300
                    },
                    open: {
                        effects: "fadeIn zoom:in",
                        duration: 300
                    }
                },
                min: new Date(),
                value:"Select Return date"
            });
            $("#departtimepicker").kendoTimePicker({
                value:"Select Departure time"
            });
            $("#returntimepicker").kendoTimePicker({
                value:"Select Return time"
            });
        },
        sourceGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                alert('source lat ='+place.geometry.location.lat());
                alert('source long ='+place.geometry.location.lng());
            });
        },
        
        stopageGoogleMap : function(myId,num)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                alert(myId+' lat ='+place.geometry.location.lat());
                alert(myId+' long ='+place.geometry.location.lng());
            });
        },
        
        destinationGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                alert('destination lat ='+place.geometry.location.lat());
                alert('destination long ='+place.geometry.location.lng());
            });
        },
        
        addStopOverFld : function(count)
        {
            if(count === 5)
            {   
                $('#addStop').css("display","none" );
                $('#deleteStop').css("display","block" );
                //$('.disabledCls').css("display",'block');
                //$("#addStop").off("click");
               // $("#addStop").attr("src",'style/images/ic_plus_disabled.png');
            }
            html = '';
            html ='<div class="removeDV'+count+'">';
            html += '<div class="imgwithStopDv">';
            html +='<div class="imgDV">';
            html += '<p><img src="style/images/ic_poi_stopover.png"/></p>';
            html +='</div>';
            html +='<div class="txtDv">';
            html +='<p><input type="text"  name="stopage'+count+'" id="stopage'+count+'" class="stoptxtfld" placeholder="Add stop place '+count+'"/></p>';
            html +='</div>';
            html +='<div class="cancelBtn">';
            html +='<img src="style/images/ic_minus.png" class="remove'+count+'" width="20px" height="20px"/>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
           $(".stopoverDv").append(html);
        },
        
        seatAvailablity : function(data)
        {
            //sessionStorage.setItem("vehicleSelect",data);
            
            if(data === 'bike')
            {
                app.offer.viewModel.setSeatAvailablity(1);
                $('.bikePassenger').css('display','block');
                $('.carPassenger').css('display','none');
            }
            
            if(data === 'bus')
            {
                app.offer.viewModel.setSeatAvailablity(60);
                $('.bikePassenger').css('display','none');
                $('.carPassenger').css('display','none');
            }
            
            if(data === 'car')
            {
                app.offer.viewModel.setSeatAvailablity(5);
                $('.bikePassenger').css('display','none');
                $('.carPassenger').css('display','block');
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
        
        stepFstContinue :function()
        {
            if(offerBindingValue.vehicle === 0 || offerBindingValue.vehicle === "0")
            {
                navigator.notification.alert("Please select your Vehicle Type",function(){},"Notification","Ok");
            }
            else if(offerBindingValue.seatavailable === 0 || offerBindingValue.seatavailable === "0")
            {
                navigator.notification.alert("Please select your Seat available",function(){},"Notification","Ok");
            }
            else
            {
                dataParam = {};
                dataParam['vechicle'] = offerBindingValue.vehicle;
                dataParam['seatAvailable'] = offerBindingValue.seatavailable;
                console.log(dataParam);
                app.mobileApp.navigate('#rideOfferView2');
            }
        },
        
        onChange :function(e)
        {
            console.log(e);
            
            if(e.checked === "true" || e.checked === true)
            {
                $('.returnDiv').slideDown('slow');
            }
            else
            {
                $('.returnDiv').slideUp('slow');
            }
        },
        
        stepScondContinue:function()
        {
            alert("ok");
        }
    });
    
    app.offer = {
        viewModel : new offerViewModel()
    };
    
})(window);