$(function(){
    //解决ie6png不透明
    DD_belatedPNG.fix(".png");
    //编辑
    $(".txt .title .icon").click(function(){
        $(this).hide();
        $(this).siblings('.bianji').css({
            display:"block"
        });
        $(this).siblings('.zishu').css({display:"block"});
        $(this).parent().css({
            background:"rgba(255,255,255,0.5)",
            color:"#000",
            border:"1px dashed #fff"
        });
        var that=this;
        var xiu=$(".txt .title h3").text().trim();
        $(".txt .title h3").empty();
        var cha=$("<input>").css({width:500,height:60,fontSize:"45px",fontFamily:"microsoft yahei",border:0}).addClass("bian").appendTo($(".txt .title h3"));
        $(cha)[0].value=xiu;
        $(cha).focusout(function() {
            var xin=$(".bian")[0].value;   
            $(".txt .title h3").html(xin); 
            $(".bian").css({display:"none"});
            $(that).parent().css({background:"none",color:"#fff",border:0});
            $(that).siblings('.zishu').css({display:"none"});
            $(that).css({display:"block"});
            $(that).siblings('.bianji').hide();
        });

        // 字体
            //var index=$(".ziti1")[0].selectedIndex;
            //var dd=$(".ziti1")[0].options[index].text;
            //console.log(index);
            // console.log($(".ziti1"));
            //console.log($(".ziti1 option:selected").text());
    });
    //颜色
    $(".title .bianji li").eq(1).click(function(){
        $(this).children('.coimg').css({display:"block"});
    });
    $(".title .bianji li").eq(2).click(function(){
        $(".txt .title h3").css({fontSize:45,color:"#fff"})
        $(this).parent().css({display:"none"});
        $(".title").css({background:"none",color:"#fff",border:0});
        var xin=$(".bian")[0].value;   
        $(".txt .title h3").html(xin);
        $(".bian").css({display:"none"});
        $(".title .zishu").hide();
        $(".title .icon").show();
    });
    $(".title .bianji li").eq(3).click(function(){
        $(this).parent().css({display:"none"});
        $(".title .zishu").css({display:"none"});
        $(".title .icon").css({display:"block"});
        $(".title").css({background:"none",color:"#fff",border:0});
        var xin=$(".bian")[0].value;   
        $(".txt .title h3").html(xin);
        $(".bian").css({display:"none"});
        
    });

    //签名
    $(".txt .qianming span").click(function(){
        $(this).hide();
        $(this).siblings('.bianji').css({
            display:"block"
        });
        $(this).siblings('.zishu').css({display:"block"});
        $(this).parent().css({
            background:"rgba(255,255,255,0.5)",
            color:"#000",
            border:"1px dashed #fff"
        });
        var that=this;
        var xiu=$(".txt .qianming p").text().trim();
        $(".txt .qianming p").empty();
        var cha=$("<input>").css({width:650,height:36,fontSize:"14px",fontWeight:"bold",border:0}).addClass("bian").appendTo($(".txt .qianming p"));
        $(cha)[0].value=xiu;
        $(cha).focusout(function() {
            var xin=$(".bian")[0].value;   
            $(".txt .qianming p").html(xin); 
            $(".bian").css({display:"none"});
            $(that).parent().css({background:"none",color:"#fff",border:0});
            $(that).siblings('.zishu').hide();
            $(that).show();
            $(that).siblings('.bianji').hide();
        });
    });
    $(".qianming .bianji li").eq(1).click(function(){
        $(this).children('.coimg').css({display:"block"});
    });
    $(".qianming .bianji li").eq(2).click(function(){
        $(".txt .title h3").css({fontSize:14,color:"#fff"});
        $(".qianming .zishu").hide();
        $(".qianming span").show();
    });
    $(".qianming .bianji li").eq(3).click(function(){
        $(this).parent().css({display:"none"});
        $(".qianming .zishu").hide();
        $(".qianming span").show();
        $(".qianming").css({background:"none",color:"#fff",border:0});
        var xin=$(".bian")[0].value;   
        $(".txt .qianming p").html(xin);
        $(".qianming .bian").css({display:"none"});
        
    });

    //关注  分享
    $(".icon .guanzhu,.icon .yiguan").click(function(){
        $(this).hide().siblings().show();
    });
    $(".icon .fenxiang").toggle(function() {
        $(this).children('ul').show().stop().animate({left:31}, 1000);
        $(this).css({width:182});
    }, function() {
       $(this).css({width:182});
       $(this).children('ul').show().animate({left:220}, 1000);
    });


    //换肤
    
    $(".banner .huanfu").click(function(){
        $(".beijing").css({
            display:"block"
        });
        var bh = $("body").height();
        var bw = $("body").width();
        $("#zhezhao").css({
            height:bh,
            width:bw,
            display:"block"
        });
    });
    
    
    //上传图片
    $(".beijing ul li").eq(8).click(function(){
        $(this).parent().hide().siblings('.shangchuan').show();  
    });
    var speed=10;
    var num=0;
    var ch=$(".shangchuan .line").width();
    var yuan=$(".shangchuan .circle").width();
     $(".shangchuan .jia").click(function(){
        num+=speed;        
        if(num<=(ch-yuan/2)){
            $(".shangchuan .circle").css({left:num+"px"});
            $(".zhezhao-l,.zhezhao-r").css({width:80-num*80/(ch-yuan/2)});
            $(".zhezhao-t,.zhezhao-b").css({height:80-num*80/(ch-yuan/2),width:886-2*(80-num*80/(ch-yuan/2)),left:80-num*80/(ch-yuan/2)});
        }       
     });

     $(".shangchuan .jian").click(function(){
        num=parseInt($(".shangchuan .circle").css("left"));
        w=parseInt($(".zhezhao-r").css("width"));
        //console.log(num)
        num-=speed;
        if(num>=-yuan/2){
            $(".shangchuan .circle").css({left:num+"px"});
            $(".zhezhao-l,.zhezhao-r").css({width:w+speed*80/(ch-yuan/2)});
            $(".zhezhao-t,.zhezhao-b").css({height:w+speed*80/(ch-yuan/2),width:886-2*(w+speed*80/(ch-yuan/2)),left:w+speed*80/(ch-yuan/2)});
        }
    }); 
    //截取图片
    $(".beijing .btn1").click(function(){
        (".shangchuan img").style.clip="rect(w+speed*80/(ch-yuan/2),width:886-(w+speed*80/(ch-yuan/2)),270-(w+speed*80/(ch-yuan/2)),w+speed*80/(ch-yuan/2))";
    });
    $(".beijing h3 span").click(function(){
        $(".beijing,#zhezhao").css({
            display:"none"
        });
    });

    /*动态页关注取消*/
    $(".show4rm-rl-b .gz").click(function(){
        $(this).hide();
        $(this).siblings('.show6rm-zhu').show();
    });
    $(".show6rm-zhu .show6rm-zhu-r").click(function(){
        $(".show6rm-zhu").hide();
        $(".show4rm-rl-b .gz").show();
    });

    /*数字过大改变*/
    var shuzi=$(".download a:eq(1) .orange").html();
    var shuzig=$(".download a:eq(1) .orange").html()/10000;
    //alert(shuzig+"万");
    if(shuzi>9999){
       $(".download a:eq(1) .orange").html(shuzig+"万");
    }

})