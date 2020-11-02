(function(){
	var HorB=$(document.documentElement);
	var title=$(".wraptitle .title");
	var floatArea=$(".wraptitle .floatArea");
	var fa=$(".floatArea .part2 a");
	var pa=$(".previewCatalog dd");
	
	/*左侧章节点击效果类名*/
/*	var a=$(".template3 .article .side .previewCatalog dl dd a").eq(0)[0].className;
	var arr=a.split(" ");
	var changedStyle=arr[1];
*/	
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
		pa.removeClass("t3-sideContentCurrent");
		pa.eq(index).addClass("t3-sideContentCurrent");
		syncStyle(index)
	})
	
	/*浮动章节跳动事件*/
	function syncStyle(index)
	{
		pa.removeClass("t3-sideContentCurrent");
		pa.eq(index).addClass("t3-sideContentCurrent");
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
	
	//章节条目收起与展开
	var itemx=$(".template3 .article .catalog .paragraph .chapter .item");
	var frame=itemx.children(".frame");
	var time=200;
	itemx.click(function()
	{
		if($(this).children(".frame").css("display")!="block")
		{
			frame.slideUp(time);
			$(this).children(".frame").slideDown(time);
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
	
})()
