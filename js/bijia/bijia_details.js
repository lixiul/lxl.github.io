/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','angularjs','util','artTemplate'],function($,angularjs,util,template){
   var productId = util.getQueryString('productid');
    $.get('http://mmb.ittun.com/api/getproduct',{'productid':productId},function(data){
       var html = template('details-tpl',{list:data.result});
        $('.details-p').html(html);
        $('.details_Price i').html($('.red').html());
        $('.details_Price .body_a').html($('table>tbody a').text());
    })

    $.get('http://mmb.ittun.com/api/getproductcom',{'productid':productId},function(data){
        console.log(data);
        var html = template('evaluate-tpl',{list:data.result});
        console.log(data.result);
        $('.Appraise').html(html);
    })


});