(function(global){
    var offerViewModel,
        app = global.app = global.app || {};
    
        offerViewModel = kendo.data.ObservableObject.extend({
         
        vehicle:'',    
        seatavailable:'',
        source:'',
        destination:'', 
        stopage1:'',
        stopage2:'',
        stopage3:'',
        stopage4:'',
        stopage5:'',    
            
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
            var dfthtml = '<option value="0">Seat Availablity</option>';
            $('#seatAvailable').html(dfthtml);
            $('#seatAvailable').attr('disabled',true);
            $('#vehicleType').val(0);
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
                value:"Select Departure date",
                format: "dd/MM/yyyy" ,
                change: function(e) {
                    app.offer.viewModel.departureDate = e['sender']['_oldText'];
                }
            });
            $("#returndatepicker").kendoDatePicker({
                min: new Date(),
                value:"Select Return date",
                format: "dd/MM/yyyy" ,
                change: function(e) {
                    app.offer.viewModel.returnDate = e['sender']['_oldText'];
                }
            });
            $("#departtimepicker").kendoTimePicker({
                value:"Select Departure time",
                change: function(e) {
                    app.offer.viewModel.departureTime = e['sender']['_oldText'];
                }
            });
            $("#returntimepicker").kendoTimePicker({
                value:"Select Return time",
                change: function(e) {
                    app.offer.viewModel.returnTime = e['sender']['_oldText'];
                }
            });
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
                
                app.offer.viewModel.source = source['formatted_address'];
                sessionStorage.setItem('source_lat',source.geometry.location.lat());
                sessionStorage.setItem('source_long',source.geometry.location.lng());
            });
        },
        
        stopageGoogleMap : function(myId)
        {
            console.log(myId);
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
                    app.offer.viewModel.stopage1 = stopage['formatted_address'];
                }
                if(myId === "stopage2")
                {
                    app.offer.viewModel.stopage2 = stopage['formatted_address'];
                }
                if(myId === "stopage3")
                {
                    app.offer.viewModel.stopage3 = stopage['formatted_address'];
                }
                if(myId === "stopage4")
                {
                    app.offer.viewModel.stopage4 = stopage['formatted_address'];
                }
                if(myId === "stopage5")
                {
                    app.offer.viewModel.stopage4 = stopage['formatted_address'];
                }
                
               // this.set(myId,stopage['formatted_address'])
                sessionStorage.setItem(myId+'_lat',stopage.geometry.location.lat());
                sessionStorage.setItem(myId+'_long',stopage.geometry.location.lng());
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
                
                app.offer.viewModel.destination = destination['formatted_address'];
                sessionStorage.setItem('destination_lat',destination.geometry.location.lat());
                sessionStorage.setItem('destination_long',destination.geometry.location.lng());
            });
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
            /*var vehicle = this.get('vehicle').trim(),
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
                app.mobileApp.navigate('#rideOfferView2');
            }*/
            app.mobileApp.navigate('#rideOfferView2');
        },
        
        onChange :function(e)
        {
            app.offer.viewModel.typeOfRide = e.checked;
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
            /*var sourcePlace = this.get('source').trim(),
                destinationPlace = this.get('destination').trim();
            
            
            if(sourcePlace === "")
            {
                navigator.notification.alert("Please enter your source place",function(){},"Notification","Ok");
            }
            else if(destinationPlace === "")
            {
                navigator.notification.alert("Please enter your destination place",function(){},"Notification","Ok");
            }
            else if(sessionStorage.getItem('stopage') !==0)
            {
                for(var i=1;i<=sessionStorage.getItem('stopage');i++)
                {
                    if(this.get('stopage'+i) === "")
                    {
                         navigator.notification.alert("Please enter your "+i+" Stopage place",function(){},"Notification","Ok");   
                    }
                }
            }
            else
            {
                console.log(sourcePlace);
                console.log(destinationPlace);
                console.log(this.get('stopage1').trim());
                console.log(this.get('stopage2').trim());
                console.log(this.get('stopage3').trim());
            }*/
            /*dataParam['source'] = offerBindingStep2.source;
            dataParam['destination'] = offerBindingStep2.destination;
            
            for(var i=1;i<=sessionStorage.getItem('stopage');i++)
            {
                dataParam['stopage'+i] = $('#stopage'+i).val();
            }
            
            if(dataParam['vechicle'] === "bike")
            {
                dataParam['bike_gender'] = $(".gender[type='radio']:checked").val();
            }
            
            if(dataParam['vechicle'] === 'car')
            {   
                dataParam['carGoingWith'] = app.offer.viewModel.carGoingWith;
                dataParam['passengerPref'] = app.offer.viewModel.carPreference;
                if(app.offer.viewModel.carPreference === 'Indivisual')
                {
                   
                    dataParam['car_gender'] = $(".carGender[type='radio']:checked").val();
                }
                else
                {
                    delete dataParam['car_gender'];
                }
            }
            
            if(app.offer.viewModel.typeOfRide === false || app.offer.viewModel.typeOfRide === "false")
            {
                dataParam['typeOfRiding'] =  false;
                dataParam['departureDate'] =  app.offer.viewModel.departureDate;
                dataParam['departureTime'] =  app.offer.viewModel.departureTime;
                delete dataParam['returnDate'];
                delete dataParam['returnTime'];
            }
            else
            {
                dataParam['typeOfRiding'] =  true;
                dataParam['departureDate'] =  app.offer.viewModel.departureDate;
                dataParam['departureTime'] =  app.offer.viewModel.departureTime;
                dataParam['returnDate'] =  app.offer.viewModel.returnDate;
                dataParam['returnTime'] =  app.offer.viewModel.returnTime;
            }
            dataParam['descriptions'] = offerBindingStep2.description;
            console.log(dataParam);*/
            
            app.mobileApp.navigate('#rideOfferView3');
        },
            
    });
    
    app.offer = {
        viewModel : new offerViewModel()
    };
    
})(window);