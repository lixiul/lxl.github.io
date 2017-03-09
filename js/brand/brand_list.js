/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','util','lazyLoad','angularjs','common'],function($,template,util,lazyLoad,angularjs,undefined){
    //console.log(11111);
    //console.log($('body').html());


    //杩欎釜椤甸潰鐨勯潤鎬佹晥鏋?
    function menuStyle(){
        $('.product_list .title li').click(function(){
            $(this).addClass("on").siblings().removeClass("on");
        });

        // 鐐瑰嚮鏄剧ず涓庨殣钘忚彍鍗曞眰
        $('.product_list .title').on('click','>li:nth-child(4)',function(){
            $(".menu_layer").addClass('add_style').removeClass('rm_style');
            $('.layer').show();
        });

        $('.menu_layer > .title> i,.layer').click(function(){
            $(".menu_layer").addClass('rm_style').removeClass('add_style');
            $('.layer').hide();
        });

        //鑿滃崟灞傜殑鍒楄〃鍒囨崲鑳屾櫙鏍峰紡
        $('.menu_layer .row_box').on('click','>.row >div',function(){
            $(this).addClass('on').siblings().removeClass('on');
        });

        //鑿滃崟灞傜殑涓婁笅绠ご鍒囨崲锛屽拰鐩掑瓙楂樺害
        $('.row_box >.head .icon').each(function(i){
            $(this).click(function(){

                if($('.row_box .row').eq(i).hasClass('heightAuto') || $(this).hasClass('glyphicon-menu-up')){
                    $('.row_box .row').eq(i).removeClass('heightAuto');
                    $(this).removeClass('glyphicon-menu-up');

                }else{
                    $('.row_box .row').eq(i).addClass('heightAuto');
                    $(this).addClass('glyphicon-menu-up');

                }
            });
        });
    }

    menuStyle();


//娓叉煋椤甸潰鍒楄〃
    function brand_list(pageid){
        var brandid = util.getQueryString('brandTitleId');
        //console.log(brandid);
        $.ajax({
            type: 'get',
            url: 'http://139.199.157.195:9090/api/getbrandproductlist',
            data: {'brandtitleid': brandid ||0 , 'pagesize': 10,'pageid':pageid},  //pagesize姣忛〉鏄剧ず鐨勬潯鏁?  姣忔鐐瑰嚮鍒嗛〉鍙戦?佽姹傛敼鍙榩ageid
            success: function (data) {
                //console.log(data.result[0].brandName);

                $('.product_list .row ul').html(template('list_tpl', {list: data.result}));


                //椤甸潰娓叉煋鏉℃暟pagesize
                //鎬绘潯鏁版槸锛歵otalCount
                var pageTotal =data.totalCount/data.pagesize; //鎬绘暟/姣忛〉鏄剧ず鐨勬?绘暟 = 椤垫暟

                var arr = [];
                for(var i= 0; i<pageTotal; i++){   //寰幆椤垫暟锛岃拷鍔犲埌arr鏁扮粍涓紝
                    arr.push('<li>第'+(i+1)+'页</li>');
                }
                $('.product_page ul').html(arr.join('')); //鐒跺悗鎶婃暟缁勮浆涓哄瓧绗︿覆锛屾坊鍔犲埌ul閲岄潰


                //鎶婃暟鎹繑鍥炵殑浠锋牸 锟? 鍘绘帀
                $('.price em').each(function(i){
                    $(this).text($(this).text().substr(1))
                });

                /*娣诲姞鎳掑姞杞?*/
                $(".pic img").lazyload({
                    effect:"fadeIn",
                    threshold:100
                });

            }
        });

    }
    brand_list(1);  //榛樿鍏堣皟鐢ㄤ竴娆?

//鍒嗛〉浜嬩欢
    function page(){
        var pageid = util.getQueryString('pageid')  || 1;//鑾峰彇椤电爜ID

        //鐐瑰嚮鍑虹幇鏉℃暟鍒楄〃
        $(".product_page button").on("click",function(){
            $(this).next().show();
        });
        //涓棿鐨勭鍑犻〉鎸夐挳
        $('.product_page ul').on("click", "li", function () {
            pageid = util.getNum($(this).html());  //鑾峰彇Li鏍囩涓殑鏁板瓧
            brand_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
            $('.ul_box').hide();
        });


        //涓婁竴椤碉紝涓嬩竴椤典簨浠?
        $('.product_page').on('click','.prev',function(){
            if(pageid <=1){
                return;
            }
            pageid--;

            brand_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
        $('.product_page').on('click','.next',function(){
            //鑾峰彇鏈?鍚庝竴椤电殑鏁板瓧
            var pageTotal = util.getNum( $('.product_page  ul li:last-child').html());  //getNum鎴彇瀛楃涓茬殑鏁板瓧
            //console.log(pageTotal);

            if(pageid >= pageTotal){
                console.log(pageTotal);
                console.log(1);
                return;
            }
            pageid++;
            brand_list(pageid);
            $('.product_page button').text("第"+ pageid +"页");
        });
    }

    page();  //璋冪敤鍒嗛〉

    util.commonInit();  //util閲岄潰鐨勶紝鎴彇瀛楃涓查噷鐨勬暟瀛?



});