/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','lazyLoad','util','angularjs','common',"swiper"],function($,template,lazyLoad,util,angularjs,undefined,undefined){
    itcast.iScroll({
        /*你想滑动的内容的父容器*/
        swipeDom:document.querySelector(".bc_Tab"),
        /*滑动的方向 */
        swipeType:'x',
        /*滑动的弹簧区间*/
        swipeDistance:100
    });
    var titleID;
    /*调取接口返回的数据进行渲染（白菜价标题）*/
    $.get('http://mmb.ittun.com/api/getbaicaijiatitle',function(data){
        //console.log(data);
        var html = template('nav-tpl',{list:data.result});
        $('.nav_ul').html(html);
        /*单击nav下面的li 给单前li下面的a标签添加类，其他兄弟元素下面的a删除类*/
        /*点击加载其他的数据*/
        $('.nav_ul>li').click('on',function(){
            $(this).children().addClass('active');
            $(this).siblings().children().removeClass('active');
            /*获取并渲染*/
            getData();


        });
        /*默认获取全部的数据*/
        getData();

        /*添加懒加载*/
        $("#list-tpl img").lazyload({
            effect:"fadeIn",
            threshold:100
        });

    });

    /**
     * 封装一个获取列表数据的函数
     */
    function getData(){
        titleID = $('.nav_ul li a.active').attr('data-id');
        $.get('http://mmb.ittun.com/api/getbaicaijiaproduct',{titleid:titleID},function(data){
            //util.setStorage('baicaiDataCache',data.result);
            var html= template('list-tpl',{list:data.result});
            $('#list-id').html(html);
        });
    }


    $('#list-id').on('click','li',function(){
        $('.tips-box').show();
        $('.tips-box').on('click',function(){
            $('.tips-box').hide();
        });
    });



});
