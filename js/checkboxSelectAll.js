// JavaScript Document
function selectAll(handler,checkboxes)
{
	handler.click(function()
	{
		var len=checkboxes.length;
		if($(this)[0].checked)
		{
			for(var i=0;i<len;i++)
			{
				checkboxes[i].checked=true;
			}
		}
		else
		{
			for(var i=0;i<len;i++)
			{
				checkboxes[i].checked=false;
			}
		}
	})
}
