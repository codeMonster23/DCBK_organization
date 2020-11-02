function pmd(id,width,interval,speed){
		//得到所有元素
		var $carousel = $(id);
		var $imageList = $carousel.find(".imageList");
		var $imageListLis = $carousel.find(".imageList li.carouselLi");
		var $leftBtn = $carousel.find(".leftBtn");
		var $rightBtn = $carousel.find(".rightBtn");
		var imageAmount = $imageListLis.length;
	
		var nowimg = 0		

		$imageListLis.clone().appendTo($imageList);
		
		//右按钮
		$rightBtn.click(rightBtnFunc);
		function rightBtnFunc(){
			if(!$imageList.is(":animated")){
				nowimg ++;
				if(nowimg > imageAmount){
					nowimg = 1;
					$imageList.css("left",0);
				}
				changePictureAndChangeCircles();
			}
		}
		//左按钮
		$leftBtn.click(function(){
			if(!$imageList.is(":animated")){
				nowimg --;
				if(nowimg < 0){
					nowimg = imageAmount - 1;
					$imageList.css("left",-width* imageAmount);
				}
				changePictureAndChangeCircles();
			}
		});
		
		//主要函数
		function changePictureAndChangeCircles(){		
			$imageList.stop(true).animate({"left":-width * nowimg},speed);
		}
		//定时器
		var timer = setInterval(rightBtnFunc,interval);
		$carousel.mouseenter(function(){clearInterval(timer);});
		$carousel.mouseleave(function(){clearInterval(timer);timer = setInterval(rightBtnFunc,interval);});
 }