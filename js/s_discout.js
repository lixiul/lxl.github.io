
define(['jquery','artTemplate','util','lazyLoad','angularjs','common'],function($, template, util,lazyload,angularjs,undefined){
    /*取到字符串里面的数字 */
    function getNum(str) {
        // console.dir(/\d+/.exec(str));
        if (!str || str.length == 0) {
            return "";
        } else {
            //exec(str)返回的是一个元素的数组，元素是匹配到的str的第一个数字。
            var ret = /\d+/.exec(str);
            if (!ret) {
                return "";
            }
            return parseInt(/\d+/.exec(str)[0]);
        }
    }
    /*往模板插件注册方法*/
    function commonInit() {
        /* 往模版插件注册方法 */
        template.helper("getNum", getNum);
    }
    commonInit();
    var pageid = util.getQueryString("pageid");
    function getPageId(pageid){
        //渲染
        $.get("http://139.199.157.195:9090/api/getmoneyctrl",{ "pageid": pageid},function(data){
            var html = template("s_discount_tpl",{ list: data.result });
            $(".product_container ul").html(html);

            //求总页数
            var pageTotal = data.totalCount / data.pagesize;
            //console.log(pageTotal);
            var arr = [];
            for(var i = 0; i < pageTotal; i++) {
                //遍历总页数，把每个第n页存在数组的一个元素中
                arr.push('<li>第' + (i + 1) + '页</li>');
            }
            //arr.join('')把所有的元素依空格分隔成字符串,然后添加到ul中
            $(".product_page ul").html(arr.join(''));
            //给中间放第几页的ul标签下button中添加每一个页数
            $(".product_page button").html("第" + pageid + "页");
        });

        /*添加懒加载*/
        $(".product_container .pic").lazyload({
            effect:"fadeIn",
            threshold:100
        });

    }
        getPageId(1);
        //换页的事件
    function changePage(){
        //绑定分页点击事件
        $(".product_page button").on("click",function(){
            $(this).next().show();
            //绑定li的点击事件
            $(".product_page ul").on("click","li",function(){
                var pageid = getNum($(this).html());
                //console.log(pageid);
                // console.log("第" + pageid + "页");
                getPageId(pageid);
                $(".product_page button").html("第" + pageid + "页");
                $(this).parent().hide();
            })
        });
        //绑定点击上一张的事件
        $(".product_page .pre").on("click",function(){
            var pageid = getNum($(".product_page button").html());
            if(pageid <= 1){
                return;
            }
            pageid--;
            $(".product_page button").html("第" + pageid + "页");
            getPageId(pageid);
        });
        //绑定点击下一页的事件
        $(".product_page .next").on("click",function(){
            var pageid = getNum($(".product_page button").html());
            var pageTotal = getNum($(".product_page li:last-child").html());
            //console.log(pageTotal);
            if(pageid >= pageTotal){
                return;
            }
            pageid++;
            $(".product_page button").html("第" + pageid + "页");
            getPageId(pageid);
        });
     }
    changePage()
});


