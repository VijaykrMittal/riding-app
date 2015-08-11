(function(global){
    var offerViewModel,
        app = global.app = global.app || {};
    
    offerViewModel = kendo.data.ObservableObject.extend({
        
        show: function()
        {
            var setHtml ="";
            setHtml = '<option>Seat Availablity</option>'
            for(var i=1;i<=40;i++)
            {
                setHtml +='<option value="'+i+'">'+i+'</option>';
            }
            $('#busSeatAvail').html(setHtml);
            
            $('.cartxtflddiv').css('display','block');
            $('.selectBx').val('car');
        },
        
        addStopOverFld : function()
        {
            /*if(typeof count === 'undefined')
            {
                count = 0;
            }
            count++
            if(count === 6)
            {
                $('.addstop').button( "disable" );
            }
            html = '';
            html ='<div id="removeDv'+count+'">';
            html += '<div class="imgwithStopDv">';
            html +='<div class="imgDV">';
            html += '<p><img src="style/images/ic_poi_stopover.png"/></p>';
            html +='</div>';
            html +='<div class="txtDv">';
            html +='<p><input type="text" name="addstop'+count+'" id="addstop'+count+'" class="stoptxtfld" placeholder="Add stop place '+count+'"/></p>';
            html +='</div>';
            html +='<div class="cancelBtn">';
            html +='<img src="style/images/ic_minus.png" class="remove'+count+'" width="20px" height="20px"/>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            $(".stopoverDv").append(html);*/
        },
        
        getmyHtmlView :function(data)
        {
            if(data === "bus")
            {
                $('.bustxtflddiv').fadeIn('slow');
                $('.biketxtFlddiv').css("display","none");
                $('.cartxtflddiv').css("display","none");
            }

            if(data === "bike")
            {
                $('.biketxtFlddiv').fadeIn('slow');
                $('.bustxtflddiv').css("display","none");
                $('.cartxtflddiv').css("display","none");
            }

            if(data === "car")
            {
                $('.cartxtflddiv').fadeIn('slow');
                $('.biketxtFlddiv').css("display","none");
                $('.bustxtflddiv').css("display","none");
            }

            /*if(data === "0" || data === 0)
            {
                $('.bustxtflddiv').css("display","none");
                $('.cartxtflddiv').css("display","none");
                $('.biketxtFlddiv').css("display","none");
            }*/
        }
        
        
    });
    
    app.offer = {
        viewModel : new offerViewModel()
    };
    
})(window);