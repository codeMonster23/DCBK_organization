// JavaScript Document
/*搜索框部分脚本*/
(function()
{
	var p=$("#wrap_absolute>p");
	var popUp=$("#wrap_absolute");
	var dropDownList=$("#search_b");
	var input=$(".material .search_a_input");
	popUp.hover(function(){popUp.css("display","block");},function(){popUp.css("display","none");});
	p.hover(function(){popUp.css("display","block");$(this).css("background-color","#d0e9f8");},function(){$(this).css("background-color","#fff");})	 
	dropDownList.click(function(){popUp.css("display","block");})	
	dropDownList.mouseout(function(){popUp.css("display","none");})	
	p.click(function()
	{
		var text=$(this).text();	
		oldValue=dropDownList.text();
		dropDownList.text(text);
		if(text=="全部")
		{
			if($.trim(input.val()).length==0 || input.val()=="输入关键词，在我的素材库内搜索素材")
			{
				input.val("输入关键词，在1.2亿篇文献中搜索素材").addClass("colorGrey");
			}
		}
		if(text=="我的素材库")
		{
			if($.trim(input.val()).length==0 || input.val()=="输入关键词，在1.2亿篇文献中搜索素材")
			{
				input.val("输入关键词，在我的素材库内搜索素材").addClass("colorGrey");
			}
		}
		$(this).text(oldValue);
		popUp.css("display","none");
	})	
	/*文本框内的信息根据选中的类别变化*/
	input.focus(function()
	{
		if(dropDownList.html()=="全部")
		{
			if($(this).val()=="输入关键词，在1.2亿篇文献中搜索素材")
			{
				$(this).val("").removeClass("colorGrey");
			}
		}
		else
		{
			if(dropDownList.html()=="我的素材库")
			{
				if($(this).val()=="输入关键词，在我的素材库内搜索素材")
				{
					$(this).val("").removeClass("colorGrey");
				}
			}	
			
		}
	})
	/*文本框内的信息根据选中的类别变化*/
	input.blur(function()
	{
		if(dropDownList.html()=="全部")
		{
			if($(this).val()=="")
			{
				$(this).val("输入关键词，在1.2亿篇文献中搜索素材").addClass("colorGrey");
			}
		}
		else
		{
			if(dropDownList.html()=="我的素材库")
			{
				if($(this).val()=="")
				{
					$(this).val("输入关键词，在我的素材库内搜索素材").addClass("colorGrey");
				}
			}	
			
		}
	})
})()
