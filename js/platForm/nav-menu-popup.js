/*弹出菜单控制 首页与子页面通用 其中首页固定显示侧边弹出分类，子页面需要鼠标滑过*/


/*判断鼠标的位置状态在显示或者隐藏弹出菜单，node1为js节点，node2为jQuery节点*/
function PopupMenuDisplay(node1,node2,dropDownListFlag,popupFlag){
	if(dropDownListFlag || popupFlag)
	{
		node1.className="active";
		node2.css("display","block");
	}
	if((!dropDownListFlag) && (!popupFlag))
	{		
		node1.className="current";
		node2.css("display","none");
	}
	}
function CheckMousePosition()  /*判断鼠标移动位置，只有当鼠标都未停留在导航元素上的时候，才隐藏菜单*/
{
	if(!popupFlag && !dropDownListFlag)
	{
		//$(".dropDownList").slideUp(500).css("z-index",8);
		
		$(".dropDownList").css("display","none");
	}
}	
var isIndexPage=isIndexPage;//是否为首页，如果不是则为false
var dropDownListFlag=false; /*鼠标是否停留在下拉列表项标识*/
var popupFlag=false;/*鼠标是否停留在弹出框标识*/
var index;/*记录当前操作的节点的序号*/
function navPopupMenu(isIndexPage)
{	
	var nodeA=$(".dropDownList > a");
	var nodePopup=$(".dropDownList > div.popUp");
	nodeA.hover(function(){
		dropDownListFlag=true;
		index=nodeA.index(this);
		/*设置弹出框的top值*/
        var pTop=($(".dropDownList > a").eq(index).offset()).top;
		
		//正常
		/*$(".dropDownList .popUp").eq(index).css("top",pTop-144);*/
		
		//添加新春横幅
		if($(".addBg")!=null && $(".addBg").css("display")=="block")
		{
			$(".dropDownList .popUp").eq(index).css("top",pTop-215);
		}
		else
		{
			$(".dropDownList .popUp").eq(index).css("top",pTop-144);
		}
		
		
		PopupMenuDisplay($(this)[0],nodePopup.eq(index),dropDownListFlag,popupFlag);
		},function(){
			dropDownListFlag=false;
			PopupMenuDisplay($(this)[0],nodePopup.eq(index),dropDownListFlag,popupFlag);
			if(!isIndexPage)
			{
				setTimeout(CheckMousePosition,100);	
			}
			});
	nodePopup.hover(function(){
		popupFlag=true;
		PopupMenuDisplay(nodeA.eq(index)[0],$(this),dropDownListFlag,popupFlag);
		},function(){
			popupFlag=false;
			PopupMenuDisplay(nodeA.eq(index)[0],$(this),dropDownListFlag,popupFlag);
			if(!isIndexPage)
			{
				setTimeout(CheckMousePosition,100);	
			}
			})
	$(".sum").hover(function(){
		//$(".dropDownList").slideDown(500).css("z-index",8);
		$(".dropDownList").css("display","block");
		},function(){
			if(!isIndexPage)
			{
				setTimeout(CheckMousePosition,100);	
			}
			})		
}

