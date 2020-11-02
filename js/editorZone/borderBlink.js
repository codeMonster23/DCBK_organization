// JavaScript Document
(function(){
		var div=$(".qt_ts");
		var input=$(".procedure .steps .chapter .caption .modifyWrap .modifyInput");
		var borderFlag=false;
		var fontColorFlag=false;
		var time;
        setTimeout(blinkBorder,2000);
		function blinkBorder()
		{
			time=0;
			for(var i=0;i<6;i++)
			{
				time+=100;
				setTimeout(function()
				{
					modifyBorder();	
					//modifyFontColor();			
				},time);	
			}
			setTimeout(blinkBorder,2000);
		}
		
		function modifyBorder() 
		{
			borderFlag=!borderFlag;
			if(borderFlag)
			{
				div.removeClass("border1").addClass("border2");	
			}
			else
			{
				div.removeClass("border2").addClass("border1");
			}
		}
		
		function modifyFontColor()
		{
			fontColorFlag=!fontColorFlag;
			if(fontColorFlag)
			{
				input.removeClass("colorGrey").addClass("colorRed");	
			}
			else
			{
				input.removeClass("colorRed").addClass("colorGrey");
			}
		}
})()
