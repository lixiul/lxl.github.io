/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','util','lazyLoad','angularjs','common'],function($,template,util,lazyLoad,angularjs,undefined){
    /*初始化字符中截取数字*/
    util.commonInit();
    //渲染页面
    function international(pageid){
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',{'pageid' :pageid},function(data){
            $('#product_list').html(template('product_list_list',{list: data.result}));
            //页面渲染条数pagesize
            //总条数是：totalCount
            var pageTotal =data.totalCount/data.pagesize; //总数/每页显示的总数 = 页数
            var arr = [];
            for(var i= 0; i<pageTotal; i++){   //循环页数，追加到arr数组中，
                arr.push('<li>第'+(i+1)+'页</li>');
            }
            $('.product_page ul').html(arr.join('')); //然后把数组转为字符串，添加到ul里面
            /*添加懒加载*/
            $(".pic img").lazyload({
                effect:"fadeIn",
                threshold:100
            });

        });

    }
    international(1);  //渲染页面

    //分页事件
    function page(){
        //点击出现条数列表
        $(".product_page button").on("click",function(){
            $(this).next().show();
        });

        var pageid = util.getQueryString('pageid') || 1;//获取页码ID

        //中间的第几页按钮
        $('.product_page ul').on("click", "li", function () {
            pageid = util.getNum($(this).html());  //获取Li标签中的数字
            international(pageid);
            $('.product_page button').text("第"+ pageid +"页");
            $('.ul_box').hide();
        });

        //上一页，下一页事件
        $('.product_page').on('click','.prev',function(){
            if(pageid <=1){
                return;
            }
            pageid--;
            international(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
        $('.product_page').on('click','.next',function(){
            //获取最后一页的数字
            var pageTotal =util.getNum( $('.product_page  ul li:last-child').html());  //getNum截取字符串的数字
            if(pageid >= pageTotal){
                return;
            }
            pageid++;
            international(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
    }

    page();  //调用分页


});