// JavaScript Document
/*textarea为需要计字数的文本框
number为显示的可输入字数
total1,total2可以为同一个值，但是在有提示语的时候两者有差异
*/
function CountWords(textarea,number,total1,total2){
				  var counter = textarea.val().length; //获取文本域的字符串长度
           				number.text(Math.abs(total1- counter));
            			textarea.keyup(function() {
                		var text = textarea.val();
               			var counter = text.length;
               			number.text(Math.abs(total2 - counter)); })   //每次减去字符长度
}