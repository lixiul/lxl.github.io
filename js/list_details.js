/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','util','artTemplate','common'],function($,util,artTemplate,undefined){
    //��Ⱦ�б�
    var productid = util.getQueryString('productId');
    $.get('http://139.199.157.195:9090/api/getmoneyctrlproduct',{productid :productid},function(data){
        var list = data.result;
        console.log(list);
        //productFrom
        //if(data.code == 200) {
        $('#content_id').html(artTemplate('content_tpl',{list: data.result}));
        //}
    });
});