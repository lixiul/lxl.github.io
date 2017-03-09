/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','util','lazyLoad','angularjs'],function($,template,util,lazyLoad,angularjs){
    //console.log(11111);
    //console.log($('body').html());


    //这个页面的静态效果
    function menuStyle(){
        $('.product_list .title li').click(function(){
            $(this).addClass("on").siblings().removeClass("on");
        });

        // 点击显示与隐藏菜单层
        $('.product_list .title').on('click','>li:nth-child(4)',function(){
            $(".menu_layer").addClass('add_style').removeClass('rm_style');
            $('.layer').show();
        });

        $('.menu_layer > .title> i,.layer').click(function(){
            $(".menu_layer").addClass('rm_style').removeClass('add_style');
            $('.layer').hide();
        });

        //菜单层的列表切换背景样式
        $('.menu_layer .row_box').on('click','>.row >div',function(){
            $(this).addClass('on').siblings().removeClass('on');
        });

        //菜单层的上下箭头切换，和盒子高度
        $('.row_box >.head .icon').each(function(i){
            $(this).click(function(){

                if($('.row_box .row').eq(i).hasClass('heightAuto') || $(this).hasClass('glyphicon-menu-up')){
                    $('.row_box .row').eq(i).removeClass('heightAuto');
                    $(this).removeClass('glyphicon-menu-up');

                }else{
                    $('.row_box .row').eq(i).addClass('heightAuto');
                    $(this).addClass('glyphicon-menu-up');

                }
            });
        });
    }

    menuStyle();


//渲染页面列表
    function bijia_list(pageid){
        var categoryid = util.getQueryString('categoryid');
        $.ajax({
            type: 'get',
            url: 'http://139.199.157.195:9090/api/getproductlist',
            data: {'pageid':pageid,'categoryid':categoryid},  //pagesize每页显示的条数  每次点击分页发送请求改变pageid
            success: function (data) {

                $('.product_list .row ul').html(template('list_tpl', {list: data.result}));

                //页面渲染条数pagesize
                //总条数是：totalCount
                var pageTotal =data.totalCount/data.pagesize; //总数/每页显示的总数 = 页数
                var arr = [];
                for(var i= 0; i<pageTotal; i++){   //循环页数，追加到arr数组中，
                    arr.push('<li>第'+(i+1)+'页</li>');
                }
                $('.product_page ul').html(arr.join('')); //然后把数组转为字符串，添加到ul里面


                //把数据返回的价格 ￥ 去掉
                $('.price em').each(function(i){
                    $(this).text($(this).text().substr(1))
                });

                /*添加懒加载*/
                $(".pic img").lazyload({
                    effect:"fadeIn",
                    threshold:100
                });

            }
        });

    }
    bijia_list(1);  //默认先调用一次

//分页事件
    function page(){
        var pageid = util.getQueryString('pageid')  || 1;//获取页码ID
        //点击出现条数列表
        $(".product_page button").on("click",function(){
            $(this).next().show();
        });

        //点击出现条数列表
        $(".product_page button").on("click",function(){
            $(this).next().show();
        });
        //中间的第几页按钮
        $('.product_page ul').on("click", "li", function () {
            pageid = util.getNum($(this).html());  //获取Li标签中的数字
            bijia_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
            $('.ul_box').hide();
        });


        //上一页，下一页事件
        $('.product_page').on('click','.prev',function(){
            if(pageid <=1){
                return;
            }
            pageid--;
            bijia_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
        $('.product_page').on('click','.next',function(){
            //获取最后一页的数字
            var pageTotal = util.getNum( $('.product_page  ul li:last-child').html());  //getNum截取字符串的数字
            //console.log(pageTotal);

            if(pageid >= pageTotal){
                return;
            }
            pageid++;
            bijia_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
    }

    page();  //调用分页

    util.commonInit();  //util里面的，截取字符串里的数字

});