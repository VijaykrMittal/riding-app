(function(global){
    var offerViewModel,
        app = global.app = global.app || {};
    
    var offerBindingValue,offerBindingStep2;
        offerViewModel = kendo.data.ObservableObject.extend({
            
        show: function()
        {  
            var dfthtml = '<option value="0">Seat Availablity</option>';
            $('#seatAvailable').html(dfthtml);
            $('#seatAvailable').attr('disabled',true);
            
            /*observable binding*/
            offerBindingValue = kendo.observable({
                seatavailable:'0',
                vehicle:'0',
            });
            kendo.bind($('#stepFstForm'), offerBindingValue);
        },
            
        rideOfferView2Show  :function()
        {
            $('#source').click(function(){
                app.offer.viewModel.sourceGoogleMap($(this).attr('id'));
            });
            
            $('#destination').click(function(){
                app.offer.viewModel.destinationGoogleMap($(this).attr('id'));
            });
            
            if(typeof viewFModel === 'undefined')
            {
                viewFModel = kendo.observable();
            }
            
            
            
            offerBindingStep2 = kendo.observable({
                source:'',
                destination:'',
            });
            kendo.bind($('#stepScondForm'), offerBindingStep2);
            
            $('#addStop').unbind();
            if(typeof count === 'undefined')
            {
                count = 0;
            }
            
            //$('.removeDV1,.removeDV2,.removeDV3,.removeDV4,.removeDV5').css("display",'none');
            
            $('#addStop').on('click',function()
            {
                count = count+1;
                if(count === 5)
                {   
                    $('#addStop').css("display","none" );
                    $('#deleteStop').css("display","block" );
                    //$('.disabledCls').css("display",'block');
                    //$("#addStop").off("click");
                   // $("#addStop").attr("src",'style/images/ic_plus_disabled.png');
                }
                sessionStorage.setItem('stopage',count);
                $('.removeDV'+count).css('display','block');
                
                $('#stopage'+count).click(function(){
                    app.offer.viewModel.stopageGoogleMap($(this).attr('id'));
                });
                
                $('.remove'+count).unbind();
                $('.remove'+count).on('click',function(){
                    $('.removeDV'+count).css('display','none');
                    
                    console.log('minus '+count);
                    count = count-1;
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
                min: new Date(),
                value:"Select Departure date"
            });
            $("#returndatepicker").kendoDatePicker({
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

        addDynVar :function(num)
        {
            viewFModel['stopage'+num] ='';
        },
            
        deleteDynVar:function(num)
        {
            delete viewFModel['stopage'+num];
        },
    
        sourceGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var source = autocomplete.getPlace();
                
                for(var x in source['address_components'])
                {
                    if($.isNumeric)
                    {
                        if(source['address_components'][x]['types'][x] === 'locality')
                        {
                            sessionStorage.setItem('source_locality',source['address_components'][x]['long_name']);
                        }
                    }
                }
                
                offerBindingStep2.source = source['formatted_address'];
                sessionStorage.setItem('source_lat',source.geometry.location.lat());
                sessionStorage.setItem('source_long',source.geometry.location.lng());
                console.log(sessionStorage.getItem('source_lat'));
                console.log(sessionStorage.getItem('source_long'));
                console.log(offerBindingStep2.source);
            });
        },
        
        stopageGoogleMap : function(myId,num)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var stopage = autocomplete.getPlace();
                
                for(var x in stopage['address_components'])
                {
                    if($.isNumeric)
                    {
                        if(stopage['address_components'][x]['types'][0] === 'locality' || stopage['address_components'][x]['types'][1] === 'locality')
                        {
                            sessionStorage.setItem(myId,stopage['address_components'][x]['long_name']);
                        }
                    }
                }
                offerBindingStep2.myId = stopage['formatted_address'];
                sessionStorage.setItem(myId+'_lat',stopage.geometry.location.lat());
                sessionStorage.setItem(myId+'_long',stopage.geometry.location.lng());
                console.log(sessionStorage.getItem(myId+'_lat'));
                console.log(sessionStorage.getItem(myId+'_long'));
                console.log(offerBindingStep2.myId);
            });
        },
        
        destinationGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var destination = autocomplete.getPlace();
                
                for(var x in destination['address_components'])
                {
                    if($.isNumeric)
                    {
                        if(destination['address_components'][x]['types'][x] === 'locality')
                        {
                            sessionStorage.setItem('Destination_locality',destination['address_components'][x]['long_name']);
                        }
                    }
                }
                
                offerBindingStep2.destination = destination['formatted_address'];
                sessionStorage.setItem('destination_lat',destination.geometry.location.lat());
                sessionStorage.setItem('destination_long',destination.geometry.location.lng());
                console.log(sessionStorage.getItem('destination_lat'));
                console.log(sessionStorage.getItem('destination_long'));
                console.log(offerBindingStep2.destination);
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
            html +='<div id="stopageDv'+count+'" class="txtDv">';
            html +='<p><input type="text" data-bind="value:stopage'+count+'"  name="stopage'+count+'" id="stopage'+count+'" class="stoptxtfld" placeholder="Add stop place '+count+'"/></p>';
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
        
        calculateDistance :function()
        {
            var R = 6371; // Radius of the earth in km
            var dLat = app.offer.viewModel.degToRed(sessionStorage.getItem('source_lat') - sessionStorage.getItem('destination_lat'));  // deg2rad below sessionStorage.getItem('source_lat');
            var dLon = app.offer.viewModel.degToRed(sessionStorage.getItem('source_long')-sessionStorage.getItem('destination_long')); 
            var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(app.offer.viewModel.degToRed(sessionStorage.getItem('source_lat'))) * Math.cos(app.offer.viewModel.degToRed(sessionStorage.getItem('destination_lat'))) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            //return d;  
            
            console.log(d);
        },
        
        degToRed : function(deg)
        {
            return deg * (Math.PI/180)
        },
        
        stepScondContinue:function()
        {
           /* console.log(offerBindingStep2.source);
            console.log(offerBindingStep2.destination);
            app.offer.viewModel.calculateDistance();*/
            console.log(offerBindingStep2.source);
            console.log(offerBindingStep2.destination);
            console.log("stopage1 "+$('#stopage1').val());
            console.log("stopage2 "+offerBindingStep2.stopage2);
            console.log("stopage3 "+offerBindingStep2.stopage3);
            console.log("stopage4 "+offerBindingStep2.stopage4);
            console.log("stopage5 "+offerBindingStep2.stopage5);
        },
            
    });
    
    app.offer = {
        viewModel : new offerViewModel()
    };
    
})(window);