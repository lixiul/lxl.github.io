/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','bootstrap','artTemplate','lazyLoad','common'],function($,undefined,template,lazyload,undefined){
    console.log(1111111);
    /*console.log($('body').html());*/

    init();
    /*初始化*/
    function init(){
        getFil();
        getgsshoparea();
        getgsproduct(0,0);
    }
    /*获取网站数据*/
    function getFil(){
        $.get('http://139.199.157.195:9090/api/getgsshop', function (result) {
            /* console.log(result);*/
            var html=template('fil-tpl',result);
            $("#cdp-sort").html(html);
            /*默认第一个选中*/
            $("#cdp-sort>ul>li").eq(0).addClass('on')
        });
    };
    /*获取地区数据*/
    function getgsshoparea(){
        $.get('http://139.199.157.195:9090/api/getgsshoparea', function (result) {
            /*console.log(result);*/
            var html=template('fils-tpl',result);
            $("#cdp-area").html(html);
            /*默认第一个选中*/
            $("#cdp-area>ul>li").eq(0).addClass('on')
        });
    };
    /*筛选位置获取初始数据*/

    /*获取商品数据*/
    function getgsproduct(sort,area){
        $.get('http://139.199.157.195:9090/api/getgsproduct',{shopid:sort,areaid:area}, function (data) {
           /* console.log(data);*/
            var html=template('pro-tpl',data);
            $(".product").html(html);
            $(".product img").lazyload({
                effect:'fadeIn',
                threshold:100,
            });
        });
    }
    /*console.log($("#cdp-area>ul>li").attr('on'));*/
    $('#filter>li>a').eq(0).text('京东').append("<i></i>");
    $('#filter>li>a').eq(1).text('华北').append("<i></i>");
    $('#filter>li>a').eq(2).text('1元').append("<i></i>");
    /*filter的点击事件委托*/
    $('.hd').on('click',"#filter>li",function () {
        var self =$(this);
        self.toggleClass('on').siblings().removeClass('on');
        /*console.log(self);*/
        if( self.children().attr("id")=="filter-sort"){
            $("#cdp-sort").toggleClass('on').siblings().removeClass('on')
        }else if(self.children().attr("id")=="filter-area"){
            $("#cdp-area").toggleClass('on').siblings().removeClass('on')
        }else if(self.children().attr("id")=="filter-price"){
            $("#cdp-price").toggleClass('on').siblings().removeClass('on')
        }else{
            $("#cdp-popSearch").toggleClass('on').siblings().removeClass('on')
        };
    });
    /*搜索按钮的点击事件*/
    $(".search").on("click", function () {
        /*切换搜索下拉的类*/
        $("#cdp-popSearch").toggleClass('on');
        /*移除筛选样式*/
        $('#cdp-popSearch').siblings().eq(0).children().children().removeClass('on');
        /*关闭网站、地区、价格的下拉框*/
        $('#cdp-popSearch').siblings('.fil').removeClass('on');
    });
    //搜索下拉的排序和分类
    $('.popSearch dl').on('click','dd',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });



    /*下拉框的点击事件委托*/
    $('.fil').on('click',"ul li a", function () {
        var self=$(this);
        if(self.parents().eq(2).attr('id')=="cdp-sort"){
            var text = self.text();
            /*点击获取内容*/
            $('#filter-sort').text(text).append("<i></i>").parent().removeClass('on');
            /*点击添加小勾*/
            self.parent().toggleClass('on').siblings().removeClass('on');
            /*点击关闭div*/
            $("#cdp-sort").removeClass('on');
            /*获取网站和地区id*/
            var sort =self.parent().attr("shopid");
            var area =$("#cdp-area>ul>li[class='on']").attr('areaid');
            /*刷新商品*/
            getgsproduct(sort,area);
        }else if(self.parents().eq(2).attr('id')=="cdp-area"){
            var text = self.text().slice(0,2);
            $('#filter-area').text(text).append("<i></i>").parent().removeClass('on');
            self.parent().toggleClass('on').siblings().removeClass('on');
            $("#cdp-area").removeClass('on')
            /*获取网站和地区id*/
            var sort =$("#cdp-sort>ul>li[class='on']").attr('shopid');
            var area =self.parent().attr("areaid");
            /*  console.log(sort);
             console.log(area);*/
            /*刷新商品*/
            getgsproduct(sort,area);
        }else if(self.parents().eq(2).attr('id')=="cdp-price"){
            var text =self.text();
            $('#filter-price').text(text).append("<i></i>").parent().removeClass('on');
            self.parent().toggleClass('on').siblings().removeClass('on');
            $("#cdp-price").removeClass('on')
        };
    });
});