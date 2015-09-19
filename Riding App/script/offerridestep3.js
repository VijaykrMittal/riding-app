(function(global){
    var step3ViewModel,
        app = global.app = global.app || {};
    
    var a = 1;
    
    step3ViewModel = kendo.data.ObservableObject.extend({
        vechicleName:'',
        stopageRoute1:'',
        stopageRoute2:'',
        stopageRoute3:'',
        stopageRoute4:'',
        stopageRoute5:'',
        priceBox:'',
        show: function()
        {
            
            //app.step3.viewModel.registervehicle(sessionStorage.getItem("vehicleSelect"));
            $('#vechicleName').text(sessionStorage.getItem("vehicleSelect"));
            
            if(sessionStorage.getItem('stopage') === 0 || sessionStorage.getItem('stopage') === null)
            {
                singleRoute=[];
                singleRoute.push({source:sessionStorage.getItem('source_locality'),source_lat:sessionStorage.getItem('source_lat'),source_long:sessionStorage.getItem('source_long'),destination:sessionStorage.getItem('Destination_locality'),destination_lat:sessionStorage.getItem('destination_lat'),destination_long:sessionStorage.getItem('destination_long')});
                console.log(singleRoute);
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
            
            $('#distance1').click(function(){
               var tooltip = $("#distance1").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance1"));
            });
            
            $('#distance2').click(function(){
               var tooltip = $("#distance2").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance2"));
            });
            
            $('#distance3').click(function(){
               var tooltip = $("#distance3").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance3"));
            });
            
            $('#distance4').click(function(){
               var tooltip = $("#distance4").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance4"));
            });
            
            $('#distance5').click(function(){
               var tooltip = $("#distance5").kendoTooltip({
                animation: {
                    close: {
                        effects: "fade:out"
                    }
                },
                position: "top"   
               }).data("kendoTooltip");
                tooltip.show($("#distance5"));
            });
            
            /*increment the value*/
            $('.priceBox1Increment').click(function(){
               console.log($('#innerRight1 p input').attr('id'));
                app.step3.viewModel.priceIncrement($('#innerRight1 p input').attr('id'));
            });
            
            $('.priceBox2Increment').click(function(){
                console.log($('#innerRight2 p input').attr('id'));
                app.step3.viewModel.priceIncrement($('#innerRight2 p input').attr('id'));
            });
            
            $('.priceBox3Increment').click(function(){
                app.step3.viewModel.priceIncrement($('#innerRight3 p input').attr('id'));
            });
            
            $('.priceBox4Increment').click(function(){
                app.step3.viewModel.priceIncrement($('#innerRight4 p input').attr('id'));
            });
            
            $('.priceBox5Increment').click(function(){
                app.step3.viewModel.priceIncrement($('#innerRight5 p input').attr('id'));
            });
            
            /*decrement value*/
            $('.priceBox1Decrement').click(function(){
                app.step3.viewModel.priceDecrement($('#innerRight1 p input').attr('id'));
            });
            
            $('.priceBox2Decrement').click(function(){
                app.step3.viewModel.priceDecrement($('#innerRight2 p input').attr('id'));
            });
            
            $('.priceBox3Decrement').click(function(){
                app.step3.viewModel.priceDecrement($('#innerRight3 p input').attr('id'));
            });
            
            $('.priceBox4Decrement').click(function(){
                app.step3.viewModel.priceDecrement($('#innerRight4 p input').attr('id'));
            });
            
            $('.priceBox5Decrement').click(function(){
                app.step3.viewModel.priceDecrement($('#innerRight5 p input').attr('id'));
            });
        },
        
        setMultipleStopageHtml : function(stopageTime)
        {
            var final = stopageTime.length -1;
            
            var mulHtml = '';
            stopageList = [];
            
            var distance,maxP,minP;
            
            for(var a=0,b=1;a<stopageTime.length-1;a++,b++)
            {
                /*if(a===final)
                {
                    break;
                }*/
                if(a===0)
                {
                    distance = app.step3.viewModel.multipleCalculateDistance(sessionStorage.getItem('source_lat'),sessionStorage.getItem('source_long'),  sessionStorage.getItem('stopage'+b+'_lat'),sessionStorage.getItem('stopage'+b+'_long'));
                    maxP = distance*sessionStorage.getItem('max');
                    minP = distance*sessionStorage.getItem('min');
                    
                    stopageList.push({distance:distance,maxprice:maxP,minPrice:minP});
                    sessionStorage.setItem('priceBox'+b+'_max',maxP);
                    sessionStorage.setItem('priceBox'+b+'_min',minP);
                }
                else
                {
                    if(a === final-1)
                    {
                        distance = app.step3.viewModel.multipleCalculateDistance(sessionStorage.getItem('stopage'+a+'_lat'),sessionStorage.getItem('stopage'+a+'_long'),  sessionStorage.getItem('destination_lat'),sessionStorage.getItem('destination_long'));
                        maxP = distance*sessionStorage.getItem('max');
                        minP = distance*sessionStorage.getItem('min');
                        stopageList.push({distance:distance,maxprice:maxP,minPrice:minP});
                        sessionStorage.setItem('priceBox'+b+'_max',maxP);
                        sessionStorage.setItem('priceBox'+b+'_min',minP);
                    }
                    else
                    {
                        distance = app.step3.viewModel.multipleCalculateDistance(sessionStorage.getItem('stopage'+a+'_lat'),sessionStorage.getItem('stopage'+a+'_long'),  sessionStorage.getItem('stopage'+b+'_lat'),sessionStorage.getItem('stopage'+b+'_long'));
                        maxP = distance*sessionStorage.getItem('max');
                        minP = distance*sessionStorage.getItem('min');
                        stopageList.push({distance:distance,maxprice:maxP,minPrice:minP});
                        sessionStorage.setItem('priceBox'+b+'_max',maxP);
                        sessionStorage.setItem('priceBox'+b+'_min',minP);
                    }
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
                }
                else
                {
                    mulHtml += '<p id="stopage'+(x+1)+'">'+stopageTime[i]+'</p>';
                }
                
                mulHtml += '</div>';
                mulHtml += '</div>';
                mulHtml += '<div style="width:10%;float:left;margin-left:5px">';
                mulHtml += '<p id="distance'+i+'" title="'+stopageList[x]['distance']+' Km" style="margin: 9px 0 0 8px;text-align: center;"><img id="increaseprice" src="style/images/ic_trips_offered.png" /></p>';   
                mulHtml += '</div>';
                mulHtml += '<div class="dvRight">';
                mulHtml += '<div class="innerRight1">';
                mulHtml += '<p class="priceBox'+i+'Increment" ><img id="increaseprice" src="style/images/ic_plus.png"/></p>';
                mulHtml += '<p class="priceBox'+i+'IncrementNo"><img id="increaseprice" src="style/images/ic_plus_disabled.png"/></p>';
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight2" id="innerRight'+i+'">';
                mulHtml += '<p><input type="text" class="priceBox" id="priceBox'+i+'" data-bind="value:priceBox" value="'+stopageList[x]['maxprice']+'" disabled/></p>';
                mulHtml += '</div>';
                mulHtml += '<div class="innerRight3">';
                mulHtml += '<p class="priceBox'+i+'Decrement"><img id="decreaseprice'+i+'"  src="style/images/ic_minus.png"/></p>';
                mulHtml += '<p class="priceBox'+i+'DecrementNO"><img id="decreaseprice'+i+'"  src="style/images/ic_minus_disabled.png"/></p>';
                mulHtml += '</div>';
                mulHtml += '</div>';
                mulHtml += '</div>';
            }
            $('.mainContentDv').html(mulHtml);
            
            for(var y=0,k=1;y<stopageTime.length-1;y++,k++)
            {
                if(parseInt($('#priceBox'+k).val()) === parseInt(sessionStorage.getItem('priceBox'+k)))
                {
                    $('.priceBox'+k+'IncrementNo').css('display','block')
                    $('.priceBox'+k+'Increment').css('display','none');
                    $('.priceBox'+k+'DecrementNO').css('display','none')
                    $('.priceBox'+k+'Decrement').css('display','block');
                }
                else
                {
                    $('.priceBox'+k+'IncrementNo').css('display','none')
                    $('.priceBox'+k+'Increment').css('display','block');
                    $('.priceBox'+k+'DecrementNO').css('display','block');
                    $('.priceBox'+k+'Decrement').css('display','none');
                }
            }
        },
        
        priceIncrement:function(data)
        {
            document.getElementById(data).value++;
            if(parseInt($('#'+data).val()) === parseInt(sessionStorage.getItem(data+'_max')))
            {
                
                console.log("equal");
                $('.'+data+'IncrementNo').show();
                $('.'+data+'Increment').hide();
                
            }
            else
            {
                console.log("noequal");
                $('.'+data+'IncrementNo').hide();
                $('.'+data+'Increment').show();
                $('.'+data+'DecrementNO').hide();
                $('.'+data+'Decrement').show();
            }
        },
        
        priceDecrement:function(data)
        {
            document.getElementById(data).value--;
            if(parseInt($('#'+data).val()) === parseInt(sessionStorage.getItem(data+'_min')))
            {
                $('.'+data+'DecrementNO').show();
                $('.'+data+'Decrement').hide();
                
            }
            else
            {
                $('.'+data+'IncrementNo').hide();
                $('.'+data+'Increment').show();
                $('.'+data+'DecrementNO').hide();
                $('.'+data+'Decrement').show();
            }
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
        
        multipleCalculateDistance:function(sourceLat,sourceLong,destinationLat,destinationLong)
        {
            console.log(sourceLat+","+sourceLong+","+destinationLat+","+destinationLong);
            
            var R = 6371; // Radius of the earth in km
            var dLat = app.step3.viewModel.degToRed(sourceLat - destinationLat);  // deg2rad below sessionStorage.getItem('source_lat');
            var dLon = app.step3.viewModel.degToRed(sourceLong-destinationLong); 
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(app.step3.viewModel.degToRed(sessionStorage.getItem('source_lat'))) * Math.cos(app.step3.viewModel.degToRed(sessionStorage.getItem('destination_lat'))) * Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return Math.round(d);  
            
            console.log(d);
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