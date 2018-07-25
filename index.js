$(function () {
    //1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    })

    //2.监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    })

    //3.监听开始游戏按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        $(".rules").stop().fadeOut(100);
        progressHandler();
        startpopAnimation();
    })
    
    //4.监听重新开始按钮的点击
    $(".restart").click(function () {
        $(".mask").stop().fadeOut(100);
        $(".score").html(0);
        progressHandler();
        startpopAnimation();
    })

    //倒计时
    function progressHandler() {
        $(".timer").html(60);
        var timer = setInterval(function () {
            var t = $(".timer").text();
            t --;
            if(t<=0){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stoppopAnimation();
            }
            if(t < 10){
                $(".timer").html('0'+t);
            }
            else{
                $(".timer").html(t);
            }
        },1000)
    }

    var animationTimer;

    //pop动画
    function startpopAnimation() {
        //建立一个数组存放pop图片
        var pop=['./images/pop_x0.png','./images/pop_x1.png','./images/pop_x2.png',
                 './images/pop_x3.png','./images/pop_x4.png','./images/pop_x5.png',
                 './images/pop_x6.png','./images/pop_x7.png','./images/pop_x8.png',
                 './images/pop_x9.png','./images/pop_x10.png','./images/pop_x11.png','./images/pop_x12.png'];
        //建立一个数组存放pip图片
        var pip=['./images/pip_x0.png','./images/pip_x1.png','./images/pip_x2.png',
                 './images/pip_x3.png','./images/pip_x4.png','./images/pip_x5.png',
                 './images/pip_x6.png','./images/pip_x7.png','./images/pip_x8.png',
                 './images/pip_x9.png','./images/pip_x10.png','./images/pip_x11.png',,'./images/pop_x12.png'];
        //存放15个洞的位置
        var arr=[
            {left:"430px",top:"210px"},
            {left:"606px",top:"210px"},
            {left:"786px",top:"210px"},
            {left:"969px",top:"210px"},
            {left:"1152px",top:"210px"},
            {left:"430px",top:"357px"},
            {left:"606px",top:"357px"},
            {left:"786px",top:"357px"},
            {left:"969px",top:"357px"},
            {left:"1152px",top:"357px"},
            {left:"430px",top:"508px"},
            {left:"606px",top:"508px"},
            {left:"786px",top:"508px"},
            {left:"969px",top:"508px"},
            {left:"1152px",top:"508px"}
        ];

        //创建一个图片
        var image = $("<img src='' class='image'> ");
        //随机获取图片的位置
        var pos = getRandom(0,14);
        //设置图片显示的位置
        image.css({
            position:"absolute",
            left:arr[pos].left,
            top:arr[pos].top
        });
        //随机获取数组类型pop或者pip
        var array = Math.round(Math.random()) == 0 ? pop : pip;
        //设置图片的内容
        window.index = 0;
        window.indexEnd = 6;
        animationTimer = setInterval(function () {
            if(index > indexEnd){
                image.remove();
                clearInterval(animationTimer);
                startpopAnimation();
            }
            image.attr("src",array[index]);
            index ++;
        },300);
        //将图片添加到界面上
        $(".container").append(image);

        //调用处理游戏规则方法
        gameRules(image);
    }

    //停止动画
    function stoppopAnimation() {
        $(".image").remove();
        clearInterval(animationTimer);
    }

    //得到[min. max]的任一随机数
    function getRandom(min, max) {
        var num1 = Math.random() * (max - min);
        var num2 = Math.round(num1 + min);
        num2 = Math.max(Math.min(num2,max),min);
        return num2;
    }

    //制定游戏规则
    function gameRules(image) {
        image.one("click",function () {
            //修改索引
            window.index = 6;
            window.indexEnd = 12;
            //拿到当前点击图片的地址
            var $src = $(this).attr("src");
            //根据图片地址判断是否是pop
            var flag = $src.indexOf("o") >= 0;
            //根据点击的图片类型增减分数
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }
            else{
                $(".score").text(parseInt($(".score").text())-10);
            }
        })
    }
})