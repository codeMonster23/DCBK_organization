/*�¼���
 *  obj   Ҫ�󶨵��¼�Դ
 *  event Ҫ�󶨵��¼�
 *  fn    Ҫ������¼��������
 * */

function addEvent(obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false)
    } else {
        obj.attachEvent("on" + event, fn);
    }
}

/*����¼���
 *  obj   Ҫ����󶨵��¼�Դ
 *  event Ҫ����󶨵��¼�
 *  fn    Ҫ����󶨵��¼��������
 * */

function removeEvent(obj, event, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(event, fn, false)
    } else {
        obj.detachEvent("on" + event, fn);
    }
}

/*��ȡ�������ʽ������ֵ*/
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/*��������body���Ͻǵ�λ��
 *
 * obj  Ҫ��ȡ�Ķ���
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

/*����ģʽ
 * obj  Ҫ��ק�Ķ���
 * options ��ק��ѡ��
 *
 * */


function drag(obj, options, callback) {         //��������
    return new drags(obj, options, callback);  //ʵ��������
}
function drags(obj, options,callback) {        //���캯��
    this.obj = obj;
    var options=options==undefined?{} :options;                //��ʼ���¼�Դ
    this.callback=callback?callback:null;
    this.dragx = options.dragx == undefined ? true : options.dragx;                           //��ʼ����ק����x��
    this.dragy = options.dragy == undefined ? true : options.dragy;                           //��ʼ����ק����y)
    this.sidex = options.sidex == undefined ? false : options.sidex;                          //��ʼ����Χ��x��
    this.sidey = options.sidey == undefined ? false : options.sidey;                          //��ʼ����Χ��y��
    this.animate = options.animate == undefined ? true : options.animate;       //��ʼ������Ч��
    this.speed = 0.7;             //�����ٶ�����
    this.start();               //���ÿ�ʼ����
}
drags.prototype = {               //ԭ�ͷ���
    start: function () {           //��ʼ����
        this.mousedown();       //������갴�·���
    },
    stop:function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    },
    mousedown: function () {       //������갴�·���
        var that = this;          //����ָ��
        this.obj.onmousedown = function (e) {   //��갴�·���
            var ev = that.getEv(e);        //����¼�����
            that.ox = that.getOx(ev);      //��ȡ��굽�¼�Դ��λ��(x)
            that.oy = that.getOy(ev);      //��ȡ��굽�¼�Դ��λ�ã�y��
            that.startx = that.ox;        //��ȡ��ʼλ��(x)
            that.starty = that.oy;        //��ȡ��ʼλ��(y)
            that.mousemove();           //��������ƶ�����
            that.mouseup();             //�������̧�𷽷�
            that.stop(ev);
        }

    },
    mousemove: function () {           //��������ƶ�����
        var that = this;              //����thisָ��
        document.onmousemove = function (e) {      //����ƶ�������������document�ϣ��������⣩
            var ev = that.getEv(e);       //��ȡ����ƶ��¼�
            that.cx = ev.clientX;         //��ȡ��굽��������ڵ�λ�ã�x��
            that.cy = ev.clientY;       //��ȡ��굽��������ڵ�λ�ã�y��
            that.endx = that.cx;        //��ȡ��ǰ����λ�ã�x��
            that.endy = that.cy;        //��ȡ��ǰ����λ�ã�y��
            var lefts = that.cx - (offset(that.obj).left - that.obj.offsetLeft) - that.ox;   //��ȡ�¼�Դ�����ƶ�λ��
            var tops = that.cy - (offset(that.obj).top - that.obj.offsetTop) - that.oy;         //��ȡ�¼�Դ�����ƶ�λ��
            if (that.sidex) {        //�ж��Ƿ�������x���������
                if (lefts < that.sidex[0]) {    //���leftsֵС��ָ��������
                    lefts = that.sidex[0]//��leftsʼ�յ�����Сֵ
                }
                if (lefts > that.sidex[1]) {//���leftsֵ����ָ��������
                    lefts = that.sidex[1]//��leftsʼ�յ������ֵ
                }
            }

            if (that.sidey) {//�������ж�x��������ͬ��
                if (tops < that.sidey[0]) {
                    tops = that.sidey[0]
                }
                if (tops > that.sidey[1]) {
                    tops = that.sidey[1]
                }

            }
            if (that.dragx) {//�ж��Ƿ����¼�Դ��x������ק
                that.obj.style.left = lefts + "px";
            }
            if (that.dragy) {//�ж��Ƿ����¼�Դ��y������ק
                that.obj.style.top = tops + "px";
            }
            that.left=lefts;
            that.top=tops;
            if(that.callback){
                that.callback(that.left,that.top);
            }
            that.chax = that.endx - that.startx;//�������ǰ����ƶ��ٶȵĿ���(ͨ��ǰ��������ò�ֵ����)
            that.chay = that.endy - that.starty;//�������ǰ����ƶ��ٶȵĿ���(ͨ��ǰ��������ò�ֵ����)
            that.startx = that.endx;//��ǰ������λ��
            that.starty = that.endy;
            that.stop(ev);
        }
    },
    mouseup: function () { //���̧��ķ���
        var that = this;  //��that����this��ָ��
        document.onmouseup = function () {//ע��document�����̧��ķ���
            document.onmousemove = null;//�����̧��ʱע������ƶ��¼�
            document.onmouseup = null;//�����̧��ʱע�������¼�
            if (!that.animate) {//�жϵ����̧��ʱ�Ƿ�ִ�ж���
                return;
            }
            that.animation();//��� animate����ֵΪ�棬��ô��ʼ���ж���
        }
    },
    animation: function () {   //�����ķ���
        var that = this;//��that����this��ָ��
        var t = setInterval(function () {//�ö�ʱ����������
            if (Math.abs(that.chax) > Math.abs(that.chay)) {//���x����Ķ����������꣬Ҫ����x��ֵ��ֹͣ����
                if (Math.abs(that.chax) < 1) {
                    clearInterval(t);
                }
            } else {//���y����Ķ����������꣬Ҫ����x��ֵ��ֹͣ����
                if (Math.abs(that.chay) < 1) {
                    clearInterval(t);
                }
            }
            //��x�Ĳ�ֵ ���ϵĳ��� �ٶ�����
            that.chax *= that.speed;
            //��y�Ĳ�ֵ ���ϵĳ��� �ٶ�����
            that.chay *= that.speed;
            //���¼�Դ��ǰ��λ��+��ֵ���ٶ�=��ǰ�¼�ԴӦ���ڵ�λ��
            var lefts = that.obj.offsetLeft + that.chax;
            var tops = that.obj.offsetTop + that.chay;

            /*���µĴ����mousemove����Ĵ���ͬ�����ǶԲ������ж�*/
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
    getEv: function (e) {//����¼���������Ե�����
        return e || window.event;
    },
    getOx: function (e) {//�����ȡ������¼�Դλ�ü����Ե�����
        return e.layerX || e.offsetX || 0;
    },
    getOy: function (e) {//�����ȡ������¼�Դλ�ü����Ե�����
        return e.layerY || e.offsetY || 0;
    }

}