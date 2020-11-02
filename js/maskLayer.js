// JavaScript Document
//遮罩层
//通过设置shadeDIV的大小和页面的大小一样，来遮盖整个页面
function mask(shadeDIV)
{
	var cWidth=document.documentElement.clientWidth || document.body.clientWidth;
	var cHeight=document.documentElement.clientHeight || document.body.clientHeight;
	var sHeight=document.documentElement.scrollHeight || document.body.scrollHeight;
	var pageWidth=cWidth;
	var pageHeight=Math.max(cHeight,sHeight);
	shadeDIV.style.width=pageWidth+"px";
	shadeDIV.style.height=pageHeight+"px";
}
	
