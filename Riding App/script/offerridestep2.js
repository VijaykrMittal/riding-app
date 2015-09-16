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
        gendermale:'male',
        genderfemale:'female',
        prefGoingWith:'',
        passengerPref:'',
        gendermale_car:'male',
        genderfemale_car:'female',
        departuredatePickerValue:'Select Departure date',
        departuretimePickerValue:'Select Departure time',
        returndatePickerValue:'Select Return date',
        returntimePickerValue:'Select Return time',
        description:'',
        
        carPreference:'',    
        carGoingWith:'',
        typeOfRide:true,
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
                    app.step2.viewModel.resetStopageValue($(this).attr('id'));
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
            
            if(sessionStorage.getItem('stepScndStatus') === null || sessionStorage.getItem('stepScndStatus') === false)
            {
                $('#prefGoingWith').val(0);
                $('#passengerPref').val(0);
                sessionStorage.setItem('stepFstStatus',true);
            }
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
        
        resetStopageValue:function(data)
        {
            if(data === "stopage1")
            {
                app.step2.viewModel.stopage1 = '';
                delete dataParam['stopage1'];
            }
            if(data === "stopage2")
            {
                app.step2.viewModel.stopage2 = '';
                delete dataParam['stopage2'];
            }
            if(data === "stopage3")
            {
                app.step2.viewModel.stopage3 = '';
                delete dataParam['stopage3'];
            }
            if(data === "stopage4")
            {
                app.step2.viewModel.stopage4 = '';
                delete dataParam['stopage4'];
            }
            if(data === "stopage5")
            {
                app.step2.viewModel.stopage5 = '';
                delete dataParam['stopage5'];
            }
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
            
            if(source === "")
            {
                navigator.notification.alert('Please enter Source value',function(){},'Notification','OK');
               // $('#source').focus();
                return true;
            }
            else if($('.removeDV1').css('display') === 'block' && stopage1 === '')
            {
                navigator.notification.alert('Stopage value is required.',function(){},'Notification','OK');
               // $('#stopage1').focus();
                return true;
            }
            else if($('.removeDV2').css('display') === 'block' && stopage2 === '')
            {
                navigator.notification.alert('Stopage value is required.',function(){},'Notification','OK');
                //$('#stopage2').focus();
                return true;
            }
            else if($('.removeDV3').css('display') === 'block' && stopage3 === '')
            {
                navigator.notification.alert('Stopage value is required.',function(){},'Notification','OK');
                //$('#stopage3').focus();
                return true;
            }
            else if($('.removeDV4').css('display') === 'block' && stopage4 === '')
            {
                navigator.notification.alert('Stopage value is required.',function(){},'Notification','OK');
                //$('#stopage4').focus();
                return true;
            }
            else if($('.removeDV5').css('display') === 'block' && stopage5 === '')
            {
                navigator.notification.alert('Stopage value is required.',function(){},'Notification','OK');
                //$('#stopage5').focus();
                return true;
            }
            else if(destination === "")
            {
                navigator.notification.alert('Please enter Destination value',function(){},'Notification','OK');
                //$('#destination').focus();
                return true;
            }
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
            }
            if(sessionStorage.getItem("vehicleSelect") === 'bike')
            {   
                if($(".gender[type='radio']:checked").val() === undefined)
                {
                    navigator.notification.alert('Please Select gender for bike Passenger Preference.',function(){},'Notification','OK');                 
                    return true;
                }
                else
                {
                    dataParam['gender'] = $(".gender[type='radio']:checked").val();
                }
                
            }
            if(sessionStorage.getItem("vehicleSelect") === 'car')
            {
                if(this.get('prefGoingWith').trim() === "" || this.get('prefGoingWith').trim() === "0" || this.get('prefGoingWith').trim() === 0 ||this.get('prefGoingWith').trim() ==="Select any one")
                {
                    navigator.notification.alert('Please Select Choice for going with.',function(){},'Notification','OK');
                    return true;
                }
                else if(this.get('passengerPref').trim() === "" || this.get('passengerPref').trim() === "0" || this.get('passengerPref').trim() === 0 || this.get('passengerPref').trim() === "Select any one")
                {
                    navigator.notification.alert('Please Select your Passenger Preference for car.',function(){},'Notification','OK');
                    return true;
                }
                else if($(".carGender[type='radio']:checked").val() === undefined && $('#carPrefgender').css('display')==='block')
                {
                    navigator.notification.alert('Please Select gender Preference for car.',function(){},'Notification','OK');
                    return true;
                }
                else
                {
                    dataParam['goingWith'] = this.get('prefGoingWith').trim();
                    dataParam['carPassengerPreference'] = this.get('passengerPref').trim();
                    dataParam['carPassengerPreferenceGender'] = $(".carGender[type='radio']:checked").val();
                }
            }
            
            if(app.step2.viewModel.typeOfRide === true)
            {
                if(this.get('departuredatePickerValue') === "Select Departure date")
                {
                     navigator.notification.alert('Please Select your departure date.',function(){},'Notification','OK');
                    return true;
                }
                else if(this.get('departuretimePickerValue') === "Select Departure time")
                {
                    navigator.notification.alert('Please Select your departure time.',function(){},'Notification','OK');
                    return true;
                }
                else if(this.get('returndatePickerValue') === "Select Return date")
                {
                    navigator.notification.alert('Please Select your return date.',function(){},'Notification','OK');
                    return true;
                }
                else if(this.get('returntimePickerValue') === "Select Return time")
                {
                    navigator.notification.alert('Please Select your return time.',function(){},'Notification','OK');
                    return true;
                }
                else
                {
                    dataParam['departureDate'] = this.get('departuredatePickerValue');
                    dataParam['departureTime'] = this.get('departuretimePickerValue');
                    dataParam['returnDate'] = this.get('returndatePickerValue');
                    dataParam['returnTime'] = this.get('returntimePickerValue');
                }
            }
            
            if(app.step2.viewModel.typeOfRide === false)
            {
                if(this.get('departuredatePickerValue') === "Select Departure date")
                {
                    navigator.notification.alert('Please Select your departure date.',function(){},'Notification','OK');
                    return true;
                }
                else if(this.get('departuretimePickerValue') === "Select Departure time")
                {
                    navigator.notification.alert('Please Select your departure time.',function(){},'Notification','OK');
                    return true;
                }
                else
                {
                    dataParam['departureDate'] = this.get('departuredatePickerValue');
                    dataParam['departureTime'] = this.get('departuretimePickerValue');
                }
            }
            
            if(this.get('description').trim() === "")
            {
                navigator.notification.alert('Please enter your trip description.',function(){},'Notification','OK');
                return true;
            }
            else
            {
                dataParam['description'] = this.get('description').trim();
            }
            //alert(JSON.stringify(dataParam));
            app.step2.viewModel.moveToFinalStep(dataParam);
        },
        
        moveToFinalStep : function(dataP)
        {
            console.log(dataP);
            app.mobileApp.navigate('views/rideOffer3.html');
        }
    });
    
    app.step2 = {
        viewModel : new step2ViewModel()
    };
    
})(window);