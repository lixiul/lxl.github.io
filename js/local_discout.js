/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','lazyLoad','angularjs','common'],function($,template,lazyload,angularjs,undefined){
    //��ȡ���ݲ���Ⱦ
    $.get('http://139.199.157.195:9090/api/getinlanddiscount',function(data){
        $('#localDiscout').html(template('local_tpl',data));
        /*���������--ʹ�������ز��*/
     $("#localDiscout .img").lazyload({
            effect:"fadeIn",
            threshold:100,
        });
    });

});


