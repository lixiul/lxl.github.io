/**
 * Created by Administrator on 2017/2/25.
 */
requirejs.config({
   baseUrl:'/',    paths:{
        jquery:'mmm/lib/jquery/jquery.min',
        bootstrap:'mmm/lib/bootstrap/js/bootstrap.min',
        common:'mmm/js/common/common',

        /*cookie插件*/
        cookie:'mmm/lib/jquery-cookie/jquery.cookie',
        /*页面加载进度条*/
        nProgress:'mmm/lib/nprogress/nprogress',
        /*模板*/
        artTemplate:'mmm/lib/artTemplate/template',
        /*小工具*/
        util:'mmm/js/common/util',

        /*懒加载*/
        lazyLoad:'mmm/lib/lazyload/jquery.lazyload.min',

        /*angularjs*/
        angularjs:'mmm/lib/angular/angular.min',

        /*swiper*/
        swiper:'mmm/lib/swiper/swipe',

        /*自定义页面*/
        index:'mmm/js/index',
        s_discout:'mmm/js/s_discout',
        bijia_search:'mmm/js/bijia/bijia_search',
        bijia_details:'mmm/js/bijia/bijia_details',
        brand:'mmm/js/brand/brand',
        brand_list:'mmm/js/brand/brand_list',
        brand_next:'mmm/js/brand/brand_next',
        baicaijia:'mmm/js/baicaijia',
        coudanpin:'mmm/js/coudanpin',
        evaluation_list:'mmm/js/evaluation_list',
        international_discout:'mmm/js/international_discout',
        list_details:'mmm/js/list_details',
        local_discout_list_details:'mmm/js/local_discout_list_details',
        local_discout:'mmm/js/local_discout',
        mall_nav:'mmm/js/mall_nav',
        s_discount:'mmm/js/s_discout',
        see_history:'mmm/js/see_history',
        value_voucher:'mmm/js/value_voucher',
        value_voucher_list:'mmm/js/value_voucher_list',
        bijia_list:'mmm/js/bijia/bijia_list',

    },
    shim:{
        bootstrap:{
            deps:['jquery']
        }
    }
});

require(['jquery','bootstrap']);

/*根据每个页面的pathname来加载对应的js文件*/
(function(window){
    var pathName = window.location.pathname;
    console.log(pathName);
    switch (pathName){
        case '/mmm/':
            require(['index']);
            break;
        case '/mmm/html/index.html':
            require(['index']);
            break;
        case '/mmm/index.html':
            require(['index']);
            break;
        case '/mmm/html/s_discout.html':
            require(['s_discout']);
            break;
        case '/mmm/html/brand.html':
            require(['brand']);
            break;
        case '/mmm/html/brand_next.html':
            require(['brand_next']);
            break;
        case '/mmm/html/brand_list.html':
            require(['brand_list']);
            break;
        case '/mmm/html/bijia_details.html':
            require(['bijia_details']);
            break;
        case '/mmm/html/bijia_search.html':
            require(['bijia_search']);
            break;
        case '/mmm/html/baicaijia.html':
            require(['baicaijia']);
            break;
        case '/mmm/html/coudanpin.html':
            require(['coudanpin']);
            break;
        case '/mmm/html/evaluation_list.html':
            require(['evaluation_list']);
            break;
        case '/mmm/html/international_discout.html':
            require(['international_discout']);
            break;
        case '/mmm/html/list_details.html':
            require(['list_details']);
            break;
        case '/mmm/html/local_discout_list_details.html':
            require(['local_discout_list_details']);
            break;
        case '/mmm/html/local_discout.html':
            require(['local_discout']);
            break;
        case '/mmm/html/mall_nav.html':
            require(['mall_nav']);
            break;
        case '/mmm/html/value_voucher.html':
            require(['value_voucher']);
            break;
        case '/mmm/html/value_voucher_list.html':
            require(['value_voucher_list']);
            break;
        case '/mmm/html/see_history.html':
            require(['see_history']);
            break;
        case '/mmm/html/bijia_list.html':
            require(['bijia_list']);
            break;
        default :
            console.log(333);
            break;
    }
})(window);



