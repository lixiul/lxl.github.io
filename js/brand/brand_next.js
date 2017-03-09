/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','bootstrap','artTemplate','angularjs','util','common'],function($,undefined,template,angularjs,util,undefined){
    template.helper("sort",sort);
    var brandid = util.getQueryString('brandTitleId');
    $.get('http://139.199.157.195:9090/api/getbrand?brandtitleid='+ brandid,{'brandTitleId':brandid} ,function (data) {
        $('.main').append(template('model-tpl1',{list: data.result}));
        $.get('http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid=0&pagesize=4', function (data) {
            $('.main').append(template('model-tpl2',{list: data.result}));
            $.get('http://139.199.157.195:9090/api/getproductcom?productid=4', function (data) {
                $('.main').append(template('model-tpl3',{list: data.result}));
            });
        });
    });

    /*еп╤оеецШ*/
    function sort(index){
        switch (index){
            case 1:
                return 'top1';
                break;
            case 2:
                return 'top2';
                break;
            case 3:
                return 'top3';
                break;
            default :
                return '';
                break;
        }
    }
});