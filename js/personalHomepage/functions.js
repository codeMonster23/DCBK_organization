/*事件绑定
 *  obj   要绑定的事件源
 *  event 要绑定的事件
 *  fn    要处理的事件处理程序
 * */

function addEvent(obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false)
    } else {
        obj.attachEvent("on" + event, fn);
    }
}

/*解除事件绑定
 *  obj   要解除绑定的事件源
 *  event 要解除绑定的事件
 *  fn    要解除绑定的事件处理程序
 * */

function removeEvent(obj, event, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(event, fn, false)
    } else {
        obj.detachEvent("on" + event, fn);
    }
}

/*获取对象的样式的属性值*/
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/*获得相对于body左上角的位置
 *
 * obj  要获取的对象
 * */
function offset(obj) {
    var arr = [obj];
    var parent = obj.parentNode;
    var result = {left: 0, top: 0};
    while (parent.nodeName !== "BODY") {
        var val = getStyle(parent, "position");
        if (val == "absolute" || val == "relative" || val == "fixed") {
            arr.push(parent);
        }
        parent = parent.parentNode;
    }
    for (var i = 0; i < arr.length; i++) {
        var borderL = 0, borderT = 0;
        if (i > 0) {
            borderL = parseInt(getStyle(arr[i], "borderLeftWidth")) || 0;
            borderT = parseInt(getStyle(arr[i], "borderTopWidth")) || 0;
        }

        result.left += borderL + arr[i].offsetLeft;
        result.top += borderT + arr[i].offsetTop;

    }
    return result;
}

/*工厂模式
 * obj  要拖拽的对象
 * options 拖拽的选项
 *
 * */


function drag(obj, options, callback) {         //创建工厂
    return new drags(obj, options, callback);  //实例化对象
}
function drags(obj, options,callback) {        //构造函数
    this.obj = obj;
    var options=options==undefined?{} :options;                //初始化事件源
    this.callback=callback?callback:null;
    this.dragx = options.dragx == undefined ? true : options.dragx;                           //初始化拖拽方向（x）
    this.dragy = options.dragy == undefined ? true : options.dragy;                           //初始化拖拽方向（y)
    this.sidex = options.sidex == undefined ? false : options.sidex;                          //初始化范围（x）
    this.sidey = options.sidey == undefined ? false : options.sidey;                          //初始化范围（y）
    this.animate = options.animate == undefined ? true : options.animate;       //初始化动画效果
    this.speed = 0.7;             //设置速度因子
    this.start();               //调用开始方法
}
drags.prototype = {               //原型方法
    start: function () {           //开始方法
        this.mousedown();       //调用鼠标按下方法
    },
    stop:function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    },
    mousedown: function () {       //构造鼠标按下方法
        var that = this;          //保存指向
        this.obj.onmousedown = function (e) {   //鼠标按下方法
            var ev = that.getEv(e);        //鼠标事件对象
            that.ox = that.getOx(ev);      //获取鼠标到事件源的位置(x)
            that.oy = that.getOy(ev);      //获取鼠标到事件源的位置（y）
            that.startx = that.ox;        //获取开始位置(x)
            that.starty = that.oy;        //获取开始位置(y)
            that.mousemove();           //调用鼠标移动方法
            that.mouseup();             //调用鼠标抬起方法
            that.stop(ev);
        }

    },
    mousemove: function () {           //构造鼠标移动方法
        var that = this;              //保存this指针
        document.onmousemove = function (e) {      //鼠标移动方法（设置在document上：调节问题）
            var ev = that.getEv(e);       //获取鼠标移动事件
            that.cx = ev.clientX;         //获取鼠标到浏览器窗口的位置（x）
            that.cy = ev.clientY;       //获取鼠标到浏览器窗口的位置（y）
            that.endx = that.cx;        //获取当前结束位置（x）
            that.endy = that.cy;        //获取当前结束位置（y）
            var lefts = that.cx - (offset(that.obj).left - that.obj.offsetLeft) - that.ox;   //获取事件源横向移动位置
            var tops = that.cy - (offset(that.obj).top - that.obj.offsetTop) - that.oy;         //获取事件源纵向移动位置
            if (that.sidex) {        //判断是否设置了x方向的区间
                if (lefts < that.sidex[0]) {    //如果lefts值小于指定的区间
                    lefts = that.sidex[0]//让lefts始终等于最小值
                }
                if (lefts > that.sidex[1]) {//如果lefts值大于指定的区间
                    lefts = that.sidex[1]//让lefts始终等于最大值
                }
            }

            if (that.sidey) {//和以上判断x方向区间同理
                if (tops < that.sidey[0]) {
                    tops = that.sidey[0]
                }
                if (tops > that.sidey[1]) {
                    tops = that.sidey[1]
                }

            }
            if (that.dragx) {//判断是否让事件源在x方向拖拽
                that.obj.style.left = lefts + "px";
            }
            if (that.dragy) {//判断是否让事件源在y方向拖拽
                that.obj.style.top = tops + "px";
            }
            that.left=lefts;
            that.top=tops;
            if(that.callback){
                that.callback(that.left,that.top);
            }
            that.chax = that.endx - that.startx;//计算出当前鼠标移动速度的快慢(通过前后两个点得差值计算)
            that.chay = that.endy - that.starty;//计算出当前鼠标移动速度的快慢(通过前后两个点得差值计算)
            that.startx = that.endx;//让前后点调换位置
            that.starty = that.endy;
            that.stop(ev);
        }
    },
    mouseup: function () { //鼠标抬起的方法
        var that = this;  //用that保存this的指针
        document.onmouseup = function () {//注册document的鼠标抬起的方法
            document.onmousemove = null;//当鼠标抬起时注销鼠标移动事件
            document.onmouseup = null;//当鼠标抬起时注销本身事件
            if (!that.animate) {//判断当鼠标抬起时是否执行动画
                return;
            }
            that.animation();//如果 animate属性值为真，那么开始运行动画
        }
    },
    animation: function () {   //动画的方法
        var that = this;//用that保存this的指针
        var t = setInterval(function () {//用定时器开启动画
            if (Math.abs(that.chax) > Math.abs(that.chay)) {//如果x方向的动画后运行完，要依照x的值来停止动画
                if (Math.abs(that.chax) < 1) {
                    clearInterval(t);
                }
            } else {//如果y方向的动画后运行完，要依照x的值来停止动画
                if (Math.abs(that.chay) < 1) {
                    clearInterval(t);
                }
            }
            //让x的差值 不断的乘以 速度因子
            that.chax *= that.speed;
            //让y的差值 不断的乘以 速度因子
            that.chay *= that.speed;
            //让事件源当前的位置+差值的速度=当前事件源应该在的位置
            var lefts = that.obj.offsetLeft + that.chax;
            var tops = that.obj.offsetTop + that.chay;

            /*以下的代码和mousemove里面的代码同理，都是对参数的判断*/
            if (that.sidex) {
                if (lefts < that.sidex[0]) {
                    lefts = that.sidex[0]
                }
                if (lefts > that.sidex[1]) {
                    lefts = that.sidex[1]
                }
            }

            if (that.sidey) {
                if (tops < that.sidey[0]) {
                    tops = that.sidey[0]
                }
                if (tops > that.sidey[1]) {
                    tops = that.sidey[1]
                }

            }
            if (that.dragx) {
                that.obj.style.left = lefts + "px";
            }
            if (that.dragy) {
                that.obj.style.top = tops + "px";
            }

        }, 50)

    },
    getEv: function (e) {//解决事件对象兼容性的问题
        return e || window.event;
    },
    getOx: function (e) {//解决获取相对于事件源位置兼容性的问题
        return e.layerX || e.offsetX || 0;
    },
    getOy: function (e) {//解决获取相对于事件源位置兼容性的问题
        return e.layerY || e.offsetY || 0;
    }

}