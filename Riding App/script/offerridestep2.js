(function(global){
    var step2ViewModel,
        app = global.app = global.app || {};
    
    step2ViewModel = kendo.data.ObservableObject.extend({
        
        vehicle:'',    
        seatavailable:'',
        source:'',
        destination:'', 
        stopage1:'',
        stopage2:'',
        stopage3:'',
        stopage4:'',
        stopage5:'',
        gendermale:false,
        genderfemale:false,
        
        carPreference:'',    
        carGoingWith:'',
        typeOfRide:'',
        departureDate:'',
        departureTime:'',
        returnDate:'',
        returnTime:'',
        vehicleType:'', 
        
        show: function()
        {
            app.step2.viewModel.setHtmlForVehicle(sessionStorage.getItem("vehicleSelect"));
            
            $('#source').click(function(){
                app.step2.viewModel.sourceGoogleMap($(this).attr('id'));
            });
            
            $('#destination').click(function(){
                app.step2.viewModel.destinationGoogleMap($(this).attr('id'));
            });
            
            $('#addStop').unbind();
            if(typeof count === 'undefined')
            {
                count = 0;
            }
            
            $('#addStop').on('click',function()
            {
                count = count+1;
                if(count === 5)
                {   
                    $('#addStop').css("display","none" );
                    $('#deleteStop').css("display","block" );
                }
                $('#stopage'+count).val('');
                sessionStorage.setItem('stopage',count);
                $('.removeDV'+count).css('display','block');
                
                $('#stopage'+count).click(function(){
                    app.step2.viewModel.stopageGoogleMap($(this).attr('id'));
                });
                
                $('.remove'+count).unbind();
                $('.remove'+count).on('click',function(){
                    $('.removeDV'+count).css('display','none');
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
            
            /*Kendo date and Time*/
            
            $("#departdatepicker").kendoDatePicker({
                min: new Date(),
                value:"Select Departure date",
                format: "dd/MM/yyyy" ,
                change: function(e) {
                    app.step2.viewModel.departureDate = e['sender']['_oldText'];
                }
            });
            $("#returndatepicker").kendoDatePicker({
                min: new Date(),
                value:"Select Return date",
                format: "dd/MM/yyyy" ,
                change: function(e) {
                    app.step2.viewModel.returnDate = e['sender']['_oldText'];
                }
            });
            $("#departtimepicker").kendoTimePicker({
                value:"Select Departure time",
                change: function(e) {
                    app.step2.viewModel.departureTime = e['sender']['_oldText'];
                }
            });
            $("#returntimepicker").kendoTimePicker({
                value:"Select Return time",
                change: function(e) {
                    app.step2.viewModel.returnTime = e['sender']['_oldText'];
                }
            });
            
            
            
            $('#datecal').click(function(){
                $("#calendar").kendoCalendar({
                    min: new Date(),
                    change: function() {
                        var value = this.value();
                        console.log(value); //value is the selected date in the calendar
                         $('#datecal').val(value);
                        $("#caldv").hide();
                    }
                });
            });

        },
        
        setHtmlForVehicle : function(data)
        {
            if(data === 'bike')
            {
                $('.bikePassenger').css('display','block');
                $('.carPassenger').css('display','none');
            }
            
            if(data === 'bus')
            {
                $('.bikePassenger').css('display','none');
                $('.carPassenger').css('display','none');
            }
            
            if(data === 'car')
            {
                $('.bikePassenger').css('display','none');
                $('.carPassenger').css('display','block');
            }
        },
        
        sourceGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var source = autocomplete.getPlace();
                
                for(var i=0;i<source['address_components'].length;i++)
                {
                    for(var j=0;j<source['address_components'][i]['types'].length;j++)
                    {
                        if(source['address_components'][i]['types'][j] === 'locality')
                        {
                            sessionStorage.setItem('source_locality',source['address_components'][i]['long_name']);
                        }
                    }
                }
                
                app.step2.viewModel.source = source['formatted_address'];
                sessionStorage.setItem('source_lat',source.geometry.location.lat());
                sessionStorage.setItem('source_long',source.geometry.location.lng());
            });
        },
        
        destinationGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var destination = autocomplete.getPlace();
                
                for(var i=0;i<destination['address_components'].length;i++)
                {
                    for(var j=0;j<destination['address_components'][i]['types'].length;j++)
                    {
                        if(destination['address_components'][i]['types'][j] === 'locality')
                        {
                            sessionStorage.setItem('Destination_locality',destination['address_components'][i]['long_name']);
                        }
                    }
                }
                
                app.step2.viewModel.destination = destination['formatted_address'];
                sessionStorage.setItem('destination_lat',destination.geometry.location.lat());
                sessionStorage.setItem('destination_long',destination.geometry.location.lng());
            });
        },
        
        stopageGoogleMap : function(myId)
        {
            var input = document.getElementById(myId);
            var autocomplete = new google.maps.places.Autocomplete(input, {country: 'IN'})
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var stopage = autocomplete.getPlace();
                
                for(var i=0;i<stopage['address_components'].length;i++)
                {
                    for(var j=0;j<stopage['address_components'][i]['types'].length;j++)
                    {
                        if(stopage['address_components'][i]['types'][j] === 'locality')
                        {
                            sessionStorage.setItem(myId,stopage['address_components'][i]['long_name']);
                        }
                    }
                }
                
                //offerBindingStep2.myId = stopage['formatted_address'];
                
                
                if(myId === "stopage1")
                {
                    app.step2.viewModel.stopage1 = stopage['formatted_address'];
                }
                if(myId === "stopage2")
                {
                    app.step2.viewModel.stopage2 = stopage['formatted_address'];
                }
                if(myId === "stopage3")
                {
                    app.step2.viewModel.stopage3 = stopage['formatted_address'];
                }
                if(myId === "stopage4")
                {
                    app.step2.viewModel.stopage4 = stopage['formatted_address'];
                }
                if(myId === "stopage5")
                {
                    app.step2.viewModel.stopage5 = stopage['formatted_address'];
                }
                
               // this.set(myId,stopage['formatted_address'])
                sessionStorage.setItem(myId+'_lat',stopage.geometry.location.lat());
                sessionStorage.setItem(myId+'_long',stopage.geometry.location.lng());
            });
        },
        
        onChange :function(e)
        {
            app.step2.viewModel.typeOfRide = e.checked;
            if(e.checked === "true" || e.checked === true)
            {
                $('.returnDiv').slideDown('slow');
            }
            else
            {
                $('.returnDiv').slideUp('slow');
            }
        },
        
        submitStepSecond:function()
        {
            //app.mobileApp.navigate('views/rideOffer3.html');
            var source = this.get('source'),
                stopage1 = this.get('stopage1'),
                stopage2 = this.get('stopage2'),
                stopage3 = this.get('stopage3'),
                stopage4 = this.get('stopage4'),
                stopage5 = this.get('stopage5'),
                destination = this.get('destination');
            
            var gender = $(".gender[type='radio']:checked").val();
            console.log(gender);
            
            /*if(source === "")
            {
                navigator.notification.alert('Please enter Source value',function(){},'Notification','OK');
                $('#source').focus();
            }
            else if($('.removeDV1').css('display') === 'block' && stopage1 === '')
            {
                navigator.notification.alert('Please enter Stopage1 value',function(){},'Notification','OK');
                $('#stopage1').focus();
            }
            else if($('.removeDV2').css('display') === 'block' && stopage2 === '')
            {
                navigator.notification.alert('Please enter Stopage2 value',function(){},'Notification','OK');
                $('#stopage2').focus();
            }
            else if($('.removeDV3').css('display') === 'block' && stopage3 === '')
            {
                navigator.notification.alert('Please enter Stopage3 value',function(){},'Notification','OK');
                $('#stopage3').focus();
            }
            else if($('.removeDV4').css('display') === 'block' && stopage4 === '')
            {
                navigator.notification.alert('Please enter Stopage4 value',function(){},'Notification','OK');
                $('#stopage4').focus();
            }
            else if($('.removeDV5').css('display') === 'block' && stopage5 === '')
            {
                navigator.notification.alert('Please enter Stopage5 value',function(){},'Notification','OK');
                $('#stopage5').focus();
            }
            else if(destination === "")
            {
                navigator.notification.alert('Please enter Destination value',function(){},'Notification','OK');
                $('#source').focus();
            }
            else*/ if(sessionStorage.getItem("vehicleSelect") === 'bike')
            {
                alert("bike");
                /*if($(".gender[type='radio']:checked").val() === 'undefined' || $(".gender[type='radio']:checked").val() === "")
                {
                    navigator.notification.alert('Please Select your gender',function(){},'Notification','OK');
                }
                else
                {
                    dataParam['gender'] = $(".gender[type='radio']:checked").val();
                }*/
                
                if($('.gender').prop('checked'))
                {
                    alert("ok");
                }
                else
                {
                    alert("no");
                }
            }
            /*else if(sessionStorage.getItem("vehicleSelect") === 'bus')
            {
                
            }
            else if(sessionStorage.getItem("vehicleSelect") === 'car')
            {
                
            }*/
            else
            {
                dataParam['source'] = source;
                for(var i=1;i<=sessionStorage.getItem('stopage');i++)
                {
                    if($('.removeDV'+i).css('display') === 'block')
                    {
                        dataParam['stopage'+i] = this.get('stopage'+i);
                    }
                }
                dataParam['destination'] = destination;
                console.log(dataParam);
            }
        }
    });
    
    app.step2 = {
        viewModel : new step2ViewModel()
    };
    
})(window);