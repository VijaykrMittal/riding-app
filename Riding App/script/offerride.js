(function(global){
    var offerViewModel,
        app = global.app = global.app || {};
    
    var offerBindingValue;
    offerViewModel = kendo.data.ObservableObject.extend({
        
        show: function()
        {   
            alert("show");
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
                $('.remove'+count).on('click',function(){
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
        
        addStopOverFld : function(count)
        {
            //console.log(count);
            if(count === 5)
            {
                //$('#addStop').css("display","none" );
                //$('.disabledCls').css("display",'block');
                $("#addStop").off("click");
                $("#addStop").attr("src",'style/images/ic_plus_disabled.png');
            }
            html = '';
            html ='<div class="removeDv'+count+'">';
            html += '<div class="imgwithStopDv">';
            html +='<div class="imgDV">';
            html += '<p><img src="style/images/ic_poi_stopover.png"/></p>';
            html +='</div>';
            html +='<div class="txtDv">';
            html +='<p><input type="text"  name="addstop'+count+'" id="addstop'+count+'" class="stoptxtfld" placeholder="Add stop place '+count+'"/></p>';
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