/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','lazyLoad','angularjs','common'],function($,template,lazyload,angularjs,undefined){
    //获取数据并渲染
    $.get('http://139.199.157.195:9090/api/getinlanddiscount',function(data){
        $('#localDiscout').html(template('local_tpl',data));
        /*添加懒加载--使用懒加载插件*/
     $("#localDiscout .img").lazyload({
            effect:"fadeIn",
            threshold:100,
        });
    });

});


