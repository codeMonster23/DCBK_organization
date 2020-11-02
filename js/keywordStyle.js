// JavaScript Document
/*此处脚本在主编空间-汇编文章第一步，和第三步公用*/
/*插入关键字*/
var input=$("#keyword");
var jsNode=document.getElementById("keyword");
function CreateKeywordNode(value)
{
	var keyword=document.createElement("div");
	var closeIt=document.createElement("div");
	closeIt.className="close";
	keyword.className="keyword";
	var text=document.createTextNode(value);
	keyword.appendChild(text);
	keyword.appendChild(closeIt);
	document.getElementById("parentFrame").insertBefore(keyword,jsNode);
	jsNode.value="";	
}

/*根据用户的输入是否带有空格来判断*/
input.keyup(function(e){
	var value=input.val();
	var useInputLength=value.length;
	if($.trim(value).length!=useInputLength)
	{
		CreateKeywordNode(jsNode.value);
		$(".keyword .close").click(function(){$(this).parent().remove();});
	}
	})
	
$(".common li").click(function(){
	var text=$(this).html().toString();
	CreateKeywordNode(text);
	$(".keyword .close").click(function(){$(this).parent().remove();});
	})	
