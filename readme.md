# myWaterfall - jQuery瀑布流布局插件

## Demo
> http://jsfiddle.net/q3011893/p5k2ogy8/embedded/result,html,css,js/

## Usage
```
<script src="//cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
<script src="js/myWaterfall.js"></script>
```

## HTML结构

在`div.box-content`中嵌入自定义的内容:

```
<div class="waterfall-container">
    <div class="box">
        <div class="box-content">
            <img src="http://cdn2.mhpbooks.com/2016/02/google.jpg">
            <p>谷歌公司成立于1998年9月4日，被公认为全球最大的搜索引擎。</p>
        </div>
    </div>
    …………
</div>
```

## 属性
```javascript

    $(".waterfall-container").waterfall({
    
            //以下为默认缺省参数
            autoResize: true, // 当浏览器大小改变时是否自动调整
            offsetWidth: 5, // 每个元素之间的宽度距离(不加单位默认px)
            offsetHeight: 20, // 每个元素之间的高度距离(不加单位默认px)
            itemWidth: 200, // 每个元素的宽度，瀑布流高度是不限制的，所以只要宽度固定就可以了
            colNumber: 4, // 规定一行有几个元素，只有autoResize: false才生效
            colNumberMin: 2, // 规定一行最小有几个元素
            colNumberMax: 5, // 规定一行最大有几个元素
            resizeDelay: 0 // 自动调整延迟时间，一般情况下不需要设置，默认的就好了
            
    }); 
            
```

## 方法

#### init - 初始化 开启布局
>  $(".waterfall-container").waterfall('init'); 

等效于

>  $(".waterfall-container").waterfall({}); 

#### destroy - 关闭布局
>  $(".waterfall-container").waterfall('destroy'); 

#### layout - 手动刷新布局
>  $(".waterfall-container").waterfall('layout'); 
