/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','common','angularjs'],function($,artTemplate,undefined,angularjs){
    init();
    function init() {
        getVocher();
    }
    function getVocher() {
        $.get('http://139.199.157.195:9090/api/getcoupon',function(res){
            var html = artTemplate("mentTpl1",{list:res.result});
            $(".quan-model").html(html);
        });
    }
});