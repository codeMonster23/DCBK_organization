// JavaScript Document 
 $.fn.autosize = function(){
  $(this).height('0px');
  if($(this).hasClass("autoTextarea")){
  var setheight = $(this).get(0).scrollHeight;
  if($(this).attr("_height") != setheight)
   $(this).height(setheight+"px").attr("_height",setheight);
  else
   $(this).height($(this).attr("_height")+"px");
 }}
