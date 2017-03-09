/**
 * Created by Administrator on 2017/3/6.
 */
define(['jquery','util','artTemplate','angularjs','common'],function($,util,template,angularjs,undefined){
    var listDataCache;
    var exp = 120000;//缓存时间
    try{
        listDataCache =  util.getStorage('listDataCache',exp);
    }catch(e){}

    if(listDataCache){
        console.log(44444);
        $('.product_list ul').html(template('product_list',{list:listDataCache}));
    }else{
        console.log(2222);
        //首页产品列表渲染
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',function(data){
            /*存数据*/
            util.setStorage('listDataCache',data.result);
            $('.product_list ul').html(template('product_list',{list:data.result}));

        });
    }

    /*通过事件委托，绑定切换菜单事件*/
    function menuToggle() {
        $(".index_nav .row").on("click",">div:nth-child(8)",function () {
            $(".index_nav .row>div:nth-last-child(-n+4)").slideToggle();
        });
    }

    //首页菜单渲染
    $.get('http://139.199.157.195:9090/api/getindexmenu',function(data){
        /*渲染数据*/
        $('.index_nav .row').html(template('menu_tpl',{list:data.result}));
        /*跳转页面*/
        changePage();
        //调用菜单切换事件
        menuToggle();
    });
    /**
     * 跳转页面的路径
     */
    function changePage(){
        $('.index_nav .row >div:nth-of-type(1) a').attr('href','./html/bijia_search.html');
        $('.index_nav .row >div:nth-of-type(2) a').attr('href','./html/s_discout.html');
        $('.index_nav .row >div:nth-of-type(3) a').attr('href','./html/local_discout.html');
        $('.index_nav .row >div:nth-of-type(4) a').attr('href','./html/baicaijia.html');
        $('.index_nav .row >div:nth-of-type(5) a').attr('href','./html/international_discout.html');
        $('.index_nav .row >div:nth-of-type(6) a').attr('href','./html/value_voucher.html');
        $('.index_nav .row >div:nth-of-type(7) a').attr('href','./html/see_history.html');
        $('.index_nav .row >div:nth-of-type(9) a').attr('href','./html/coudanpin.html');
        $('.index_nav .row >div:nth-of-type(11) a').attr('href','./html/mall_nav.html');
        $('.index_nav .row >div:nth-of-type(12) a').attr('href','./html/brand.html');
    }
    util.commonInit();
});
