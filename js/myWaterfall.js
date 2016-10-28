/**
 * Created by colin.jiang on 2016/10/27.
 */

(function ($) {

    //-----------------全局属性

    //储存选项
    var settings;
    //窗口改变的setouttim方法
    var st;

    //-----------------暴露接口
    var methods = {
        init: function (options) {

            settings = $.extend({
                container: this, // 父容器
                autoResize: true, // 当浏览器大小改变时是否自动调整
                offsetWidth: 5, // 每个元素之间的宽度距离(不加单位默认px)
                offsetHeight: 10, // 每个元素之间的高度距离(不加单位默认px)
                itemWidth: 260, // 每个元素的宽度，瀑布流高度是不限制的，所以只要宽度固定就可以了
                colNumber: 4, // 规定一行有几个元素，只有autoResize: false才生效
                colNumberMin: 2, // 规定一行最小有几个元素
                colNumberMax: 5, // 规定一行最大有几个元素
                resizeDelay: 0 // 自动调整延迟时间，一般情况下不需要设置，默认的就好了
            }, options);

            //参数验证
            if (typeof settings.autoResize !== 'boolean') {
                settings.autoResize = true;
            }
            if (isNaN(settings.offsetWidth) || settings.offsetWidth < 0) {
                settings.offsetWidth = 5;
            }
            if (isNaN(settings.offsetHeight) || settings.offsetHeight < 0) {
                settings.offsetHeight = 10;
            }
            if (isNaN(settings.itemWidth) || settings.itemWidth < 0) {
                settings.itemWidth = 10;
            }
            if (isNaN(settings.colNumber) || settings.colNumber < 0) {
                settings.colNumber = 4;
            }
            if (isNaN(settings.colNumberMin) || settings.colNumberMin < 0) {
                settings.colNumberMin = 2;
            }
            if (isNaN(settings.colNumberMax) || settings.colNumberMax < 0) {
                settings.colNumberMax = 5;
            }
            if (isNaN(settings.resizeDelay) || settings.resizeDelay < 0) {
                settings.resizeDelay = 50;
            }

            //窗口改变触发重新布局
            if (settings.autoResize) {
                $(window).on("resize", windowChangeAutoLayout);
            }

            //初始化布局
            methods.layout();

            return this;

        },
        destroy: function () {

            return this.each(function () {
                //绝对布局改为浮动
                $(this).find('.box').css({"position": "", "top": "", left: "", float: "left"});
                //解绑window的resize事件
                $(window).off("resize", windowChangeAutoLayout);
            });

        },
        layout: function () {

            //判断页面能承载多少列
            var colsNum = window.innerWidth / settings.itemWidth;
            colsNum = Math.floor(colsNum);

            if (!settings.autoResize) {//如果列数被用户固定
                colsNum = settings.colNumber;
            } else if (colsNum > settings.colNumberMax) {//如果超过最大列数
                colsNum = settings.colNumberMax;
            } else if (colsNum < settings.colNumberMin) {//如果低于最小列数
                colsNum = settings.colNumberMin;
            }

            console.log("now cols-number:" + colsNum);

            //设置contianer的宽度以便居中
            settings.container.width(colsNum * settings.itemWidth);
            //设置box的宽度
            settings.container.find(".box").width(settings.itemWidth);
            //设置item剩下元素的默认CSS
            setCss();

            //setCss需要时间
            setTimeout(function () {
                var elesHeight = [];//每个元素的高度
                var colsHeight = new Array(colsNum); //每列元素现有的高度
                //初始化colsHeight数组
                for (var i = 0; i < colsHeight.length; ++i) {
                    colsHeight[i] = 0;
                }

                //给elesHeight赋值
                settings.container.find(".box").each(function (index, item) {
                    var eleHeight = $(this).height();
                    elesHeight.push(eleHeight);
                });

                //依次摆放每一个item
                settings.container.find(".box").each(function (index, item) {

                    //获得该元素应该在第几列(也就是高度最小的那一列)
                    var colShould = getMinHeightCol(colsHeight);

                    //给item绝对定位到恰当位置
                    var tempTop = colsHeight[colShould];
                    var tempLeft = colShould * settings.itemWidth;
                    $(this).css({position: "absolute", top: tempTop + "px", left: tempLeft + "px"});

                    //同时更新colsHeight数据
                    colsHeight[colShould] += $(this).outerHeight(true);

                });


            }, 50);

            return this;

        }
    };

    //-------------外部分发接口

    $.fn.waterfall = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.waterfall');
        }
    };

    //-------------内部功能函数

    //当窗口改变的注册事件
    function windowChangeAutoLayout() {
        if (st) {
            clearTimeout(st);
        }
        st = setTimeout(function () {
            methods.layout();
        }, settings.resizeDelay);
    }

    //得到n列中高度最小的那一列
    function getMinHeightCol(arr) {
        var minHeight = Math.min.apply(null, arr);
        //console.log("最小高度:" + minHeight);
        for (var i in arr) {
            if (arr[i] == minHeight) {
                return i;
            }
        }
        //默认第一列
        return 0;
    }

    //设置item的css
    function setCss() {
        if (!isNaN(settings.offsetWidth)) {
            settings.offsetWidth = settings.offsetWidth + "px";
        }
        if (!isNaN(settings.offsetHeight)) {
            settings.offsetHeight = settings.offsetHeight + "px";
        }
        settings.container.css({"position": "relative", "margin": "0 auto"});
        settings.container.find(".box-content").css({
            "text-align": "center",
            "margin": settings.offsetHeight + " " + settings.offsetWidth,
            "box-sizing": "border-box"
        });
    }

})(jQuery);

