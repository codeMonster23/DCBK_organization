// JavaScript Document
(function(){
var f=$(".floatArea");
var time=200;
var chapter=$(".template2 .floatArea .chapter .center .num");
var len=chapter.length;
var ac=$(".template2 .articleChapters");
var itemx=$(".template2 .articleChapters .inner .paragraph .chapter .item");
var frame=itemx.children(".frame");
//获取显示在浮动区域display=block的num,并返回数组
function getBlockChapter()
{
	var arr=new Array();
	for(var i=0;i<len;i++)
	{
		if(chapter.eq(i).css("display")=="block")
		{
			arr.push(chapter.eq(i));
		}
	}
	return arr;
}

//鼠标点击章节页面滚动到相应的章节，并靠顶部停靠，同时切换选中样式
chapter.click(function()
{
	var index=$(this).index();
	var os=ac.eq(index).offset();
	var scrollValue=os.top-90;
	if(document.compatMode=="CSS1Compat")
	{
		//下面两个设置都必须有，不会报错
		$("body").animate({scrollTop:scrollValue},time);
		$("html").animate({scrollTop:scrollValue},time);
	}
	else
	{
		$("body").animate({scrollTop:scrollValue},time);
	}
	chapter.removeClass("current").eq(index).addClass("current");
})

//滚动鼠标章节导航屏幕上固定显示
window.onscroll=function()
{
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var scrollHeight=$(".forHeight").height();
	if(scrollTop>=500 && scrollTop<(scrollHeight+400))
	{
		f.addClass("fly").css("display","block");
	}
	else
	{
		if(scrollTop >= (scrollHeight+400))
		{
			f.slideUp(time);
		}
		else
		{
			f.removeClass("fly");
		}
	}
}

//鼠标移动到章节上显示章节名
chapter.hover(function(){$(this).children(".titleTriangle").slideDown(100);},function(){$(this).children(".titleTriangle").slideUp(100);});

//往前移动
$(".template2 .floatArea .chapter .prev").click(function()
{
	if(len>5)
	{
		var arr=[];
		arr=getBlockChapter();
		var index=chapter.index(arr[0]);
		if(index!=0)
		{
			arr[arr.length-1].css("display","none");
			chapter.eq(index-1).css("display","block");
		}
	}
})

//往后移动
$(".template2 .floatArea .chapter .next").click(function()
{
	if(len>5)
	{
		var arr=getBlockChapter();
		var index=chapter.index(arr[arr.length-1]);
		if(index+1!=len)
		{
			chapter.eq(index+1).css("display","block");
			chapter.eq(index-4).css("display","none");
		}
	}
})

//章节条目收起与展开
itemx.click(function()
{
	if($(this).children(".frame").css("display")!="block")
	{
		frame.slideUp(time);
		$(this).children(".frame").slideDown(time);
	}
})
})()
