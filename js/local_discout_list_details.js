/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','util','artTemplate','common'],function($,util,artTemplate,undefined){
    var productId = util.getQueryString('productId');
    $.get('http://139.199.157.195:9090/api/getdiscountproduct',{productid:productId},function(data){
        console.log(data);
        //productFrom
        //if(data.code == 200) {
        $('#content_id').html(artTemplate('content_tpl',{list: data.result}));
        //}
    });
});