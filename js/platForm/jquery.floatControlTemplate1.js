(function(){
	/*可为参数*/
	var HorB=$(document.documentElement);
	var title=$(".wraptitle .title");
	var floatArea=$(".wraptitle .floatArea");
	var fa=$(".floatArea .part2 a");
	var pa=$(".previewCatalog dd a");
	
    /*左侧章节点击效果类名*/
	var tmpa = $(".template1 .article .side .previewCatalog dl dd a");
	var changedStyle = "";
	if (tmpa != undefined && tmpa.eq(0)[0] != undefined) {
	    var a = tmpa.eq(0)[0].className;
	    var arr = a.split(" ");
	    changedStyle = arr[1];
	}

	/*浮动条显隐*/
	
	$(window).scroll(function()
	{
		var sTop=document.documentElement.scrollTop || document.body.scrollTop;
		if(HorB.width()>1046)
		{
			if(sTop>=350)
			{
				title.css("visibility","hidden");
				floatArea.slideDown(200);
			}
			if(sTop<350)
			{
				title.css("visibility","visible");
				floatArea.slideUp(200);
			}	
		}
		
	})
	
	/*浮动章节跳动事件*/
	fa.click(function()
	{
		var index=fa.index(this);
		syncStyle(index)
	})
	
	/*左侧固定章节跳动*/
	pa.click(function()
	{
		var index=pa.index(this);
		syncStyle(index)
	})
	
	/*浮动章节跳动事件*/
	function syncStyle(index)
	{
		pa.removeClass(changedStyle);
		pa.eq(index).addClass(changedStyle);
		fa.removeClass("current");
		fa.eq(index).addClass("current");
		ChapterPos(index);
	}
	
	
	/*章节定位到顶部一定位置函数*/
	function ChapterPos(index)
	{
		  var obj=$(".chapter").eq(index).offset();
		  /*标准模式与兼容模式*/
		  if(document.body.scrollTop)
		  {
			 $(document.body).animate({scrollTop:obj.top-90},200); 
		  }
		  else
		  {
			  $(document.documentElement).animate({scrollTop:obj.top-90},200); 
		  }
	}
	
	/*目录简介显隐*/
	//$(".paragraph .chapter .item .title").click(function()
	//{

	//    //var vitem = $(this).parent().siblings();
	//    //var vchapter = $(this).parent().parent().siblings();
	//    //$.each(vitem, function (index, element) {
	//    //    element.find(".frame").hide();
	//    //});

	//    //$.each(vchapter, function (index, element) {
	//    //    element.find(".frame").hide();
	//    //});
	   
	//    //$(this).siblings().slideToggle(200);
	//	$(this).siblings(".paragraph .chapter .item .frame").slideToggle(200);
	//})

    /*目录简介显隐*/
	var itemx = $(".template1 .article .catalog .paragraph .chapter .item");
	var frame = itemx.children(".frame");
	var time = 200;
	itemx.click(function () {

	        //if ($(this).children(".frame").css("display") != "block") {
	        //    frame.slideUp(time);
	        //    $(this).children(".frame").slideDown(time);
	        //}
	   
            //点击当前文章标题，如果是展开，再点击则关闭，如果是关闭，则展开
	        frame.slideUp(time);
	        if ($(this).children(".frame").css("display") != "block") {
	            $(this).children(".frame").slideDown(time);
	        }
	        else {
	            $(this).children(".frame").slideUp(time);
	        }	    	   
	})
	
	/*窗口大小变动浮动显隐*/
	$(window).resize(function()
	{
		var sTop=document.documentElement.scrollTop || document.body.scrollTop;
		if(HorB.width()<=1046)
		{
			title.css("visibility","visible");
			floatArea.css("display","none");
		}
		else
		{
			if(sTop>=350)
			{
				title.css("visibility","hidden");
				floatArea.css("display","block");
			}
			else
			{
				title.css("visibility","visible");
				floatArea.css("display","none");
			}
		}
	})
	
    /*左侧简介显示更多*/

    /*左侧简介显示更多*/
	var content = $(".template1 .article .side .intro .content");
	var backToMore = $(".template1 .article .side .intro .back");
	var more = $(".template1 .article .side .intro .more");
	more.css({ "display": "none" });
	if (content.height() > 200) {
	    content.addClass("limitedHeight");
	    more.css({ "display": "block" });
	}

	
	more.click(function()
	{
		if(content.hasClass("limitedHeight"))
		{
			content.removeClass("limitedHeight");
			$(this).css("display","none");	
			backToMore.css("display","block")
		}
	})
	$(".template1 .article .side .intro .back").click(function()
	{
			content.addClass("limitedHeight");
			$(this).css("display","none");	
			more.css("display","block");
	})
})()
