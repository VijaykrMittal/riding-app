(function(global){
    var step3ViewModel,
        app = global.app = global.app || {};
    
    step3ViewModel = kendo.data.ObservableObject.extend({
        vechicleName:'',
        show: function()
        {
            //app.step3.viewModel.registervehicle(sessionStorage.getItem("vehicleSelect"));
            $('#vechicleName').text(sessionStorage.getItem("vehicleSelect"));
            
            if(sessionStorage.getItem('stopage') === 0 || sessionStorage.getItem('stopage') === null)
            {
                singleRoute=[];
                singleRoute.push({source:sessionStorage.getItem('source_locality'),source_lat:sessionStorage.getItem('source_lat'),source_long:sessionStorage.getItem('source_long'),destination:sessionStorage.getItem('Destination_locality'),destination_lat:sessionStorage.getItem('destination_lat'),destination_long:sessionStorage.getItem('destination_long')});
                console.log(singleRoute);
                //app.step3.viewModel.setSingleStopageHtml(sessionStorage.getItem('source_locality'),sessionStorage.getItem('Destination_locality'));
                app.step3.viewModel.setSingleStopageHtml(singleRoute);
            }
            else
            {
                stopageRute = [];
                stopageRute.push(sessionStorage.getItem('source_locality'));
                for(var i=1;i<=sessionStorage.getItem('stopage');i++)
                {
                    stopageRute.push(sessionStorage.getItem('stopage'+i));
                }
                stopageRute.push(sessionStorage.getItem('Destination_locality'));
                alert(sessionStorage.getItem('stopage'));
                app.step3.viewModel.setMultipleStopageHtml(stopageRute);
            }
            
            $('#distance').click(function(){
               var tooltip = $("#distance").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance"));
            });
            
            
        },
        
        setMultipleStopageHtml : function(stopageTime)
        {
            var final = stopageTime.length -1;
            
            var mulHtml = '';
            
            for(var a=0,b=1;a<stopageTime.length;a++,b++)
            {
                if(a===0)
                {
                    app.step3.viewModel.calculateDistance(singleData[0]['source_lat'],singleData[0]['source_long'],singleData[0]['destination_lat'],singleData[0]['destination_long']);
                }
            }
            
            
            
            for(var x=0,i=1;x<stopageTime.length;x++,i++)
            {
                if(x=== final)
                {
                    break;
                }
                mulHtml += '<div class="stopagepriceDv" id="stopagepriceDv'+i+'">';
                mulHtml += '<div class="dvLeft">';
                mulHtml += '<div class="innerRight1">';
                if(x===0)
                {
                    mulHtml += '<p id="source">'+stopageTime[x]+'</p>';
                   // routeList.push(sessionStorage.getItem('source_lat'),sessionStorage.getItem('source_long'));
                }
                else
                {
                    mulHtml += '<p id="stopage'+x+'">'+stopageTime[x]+'</p>';
                }
                
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight2">';
                mulHtml += '<p><img id="simple" src="style/images/arrow.png"/></p>';
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight3">';
                if(x === final-1)
                {
                    mulHtml += '<p id="destination">'+stopageTime[i]+'</p>';
                    //routeList.push(sessionStorage.getItem('destination_lat'),sessionStorage.getItem('destination_long'));
                }
                else
                {
                    mulHtml += '<p id="stopage'+(x+1)+'">'+stopageTime[i]+'</p>';
                }
                
                mulHtml += '</div>';
                mulHtml += '</div>';
                mulHtml += '<div style="width:10%;float:left;">';
                mulHtml += '<p id="distance" title="" style="margin: 9px 0 0 0;text-align: center;"><img id="increaseprice" src="style/images/ic_trips_offered.png" /></p>';   
                mulHtml += '</div>';
                mulHtml += '<div class="dvRight">';
                mulHtml += '<div class="innerRight1">';
                mulHtml += '<p><img id="increaseprice" src="style/images/ic_plus.png"/></p>';
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight2">';
                mulHtml += '<p><input type="text" class="priceBox" value="135" disabled/></p>';
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight3">';
                mulHtml += '<p><img id="decreaseprice" src="style/images/ic_minus.png"/></p>';
                mulHtml += '</div>';
                mulHtml += '</div>';
                mulHtml += '</div>';
            }
            $('.mainContentDv').html(mulHtml);
            
            
        },

        
        setSingleStopageHtml : function(singleData)
        {
            var route = app.step3.viewModel.calculateDistance(singleData[0]['source_lat'],singleData[0]['source_long'],singleData[0]['destination_lat'],singleData[0]['destination_long']);
            var singleHtml = '';
            singleHtml += '<div class="stopagepriceDv">';
            singleHtml += '<div class="dvLeft">';
            singleHtml += '<div class="innerRight1">';
            singleHtml += '<p>'+singleData[0]['source']+'</p>';
            singleHtml += '</div>';
            singleHtml += '<div class="innerRight2">';
            singleHtml += '<p><img id="simple" src="style/images/arrow.png"/></p>';
            singleHtml += '</div>';
            singleHtml += '<div class="innerRight3">';
            singleHtml += '<p>'+singleData[0]['destination']+'</p>';
            singleHtml += '</div>';
            singleHtml += '</div>';
            singleHtml += '<div style="width:10%;float:left;">';
            singleHtml += '<p id="distance" title="'+route+' Km" style="margin: 9px 0 0 0;text-align: center;"><img id="increaseprice" src="style/images/ic_trips_offered.png" /></p>';   
            singleHtml += '</div>';
            singleHtml += '<div class="dvRight">';
            singleHtml += '<div class="innerRight1">';
            singleHtml += '<p><img id="increaseprice" src="style/images/ic_plus.png"/></p>';
            singleHtml += '</div>';
            singleHtml += '<div class="innerRight2">';
            singleHtml += '<p><input type="text" class="priceBox" value="135" disabled/></p>';
            singleHtml += '</div>';
            singleHtml += '<div class="innerRight3">';
            singleHtml += '<p><img id="decreaseprice" src="style/images/ic_minus.png"/></p>';
            singleHtml += '</div>';
            singleHtml += '</div>';
            singleHtml += '</div>';
            
            $('.mainContentDv').html(singleHtml);
        },
        
        multipleCalculateDistance:function(data)
        {
            console.log(data);
        },
        
        calculateDistance :function(sourceLat,sourceLong,destinationLat,destinationLong)
        {
            var R = 6371; // Radius of the earth in km
            var dLat = app.step3.viewModel.degToRed(sourceLat - destinationLat);  // deg2rad below sessionStorage.getItem('source_lat');
            var dLon = app.step3.viewModel.degToRed(sourceLong-destinationLong); 
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(app.step3.viewModel.degToRed(sessionStorage.getItem('source_lat'))) * Math.cos(app.step3.viewModel.degToRed(sessionStorage.getItem('destination_lat'))) * Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return Math.round(d);  
            
            console.log(d);
        },
        
        degToRed : function(deg)
        {
            return deg * (Math.PI/180)
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