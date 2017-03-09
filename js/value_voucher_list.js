/**
 * Created by Administrator on 2017/3/7.
 */


define(['jquery','artTemplate','util','common','angularjs'],function($,artTemplate,util,undefined,angularjs){
    $('#ctl00_Menu a').eq(1).attr('href','value_voucher.html');
    $('#ctl00_Menu a').eq(0).attr('href','index.html');
    init();
    function init() {
        var couponid=   util.getQueryString('couponId');
        getVochers(couponid);
        titleDis(couponid);
    }
    function getVochers(couponid){
        $.get('http://139.199.157.195:9090/api/getcouponproduct',{couponid:couponid},function(data){
         /*   console.log(data);*/
            var list = data.result;
            $('#quanlists ul').html(artTemplate('mentTpl',{list:data.result}));
            /*寮瑰嚭妗嗙殑鏄剧ず涓庨殣钘�*/
            /*鐐瑰嚮li鏍囩鐨勬椂鍊�*/
            var self;
            $(".quan-list li").on('click',function(){
                self =$(this);
                /*閬僵灞傛樉绀�*/
                $(".placeholder").show();
                /*璋冪敤鏂规硶銆傛樉绀轰骇鍝�*/
              var img =  self.find('img').clone();
                getArr(img);
                $(".carousel_img").show();
            });
            /*宸︾澶寸偣鍑讳簨浠�*/
            $('.car-left').on('click', function () {
                var img = self.next().find('img').clone();
                if(self.prev().text()){
                    self = self.next();
                }
                self = self.next();
                getArr(img);
            });
            /*鍙崇澶寸偣鍑讳簨浠�*/
            $('.car-right').on('click', function () {
                var img = self.prev().find('img').clone();
                if(self.prev().text()){
                    self = self.prev();
                }
                getArr(img);
            });
            /*鏇挎崲鍥剧墖鐨勬柟娉�*/
            function getArr(img){
                    img.replaceAll($(".carousel_img img"));
            }
          /*  $('#carousel-inner').html(artTemplate('mentTps',{list:data.result}));*/
            /*鍗曞嚮閬僵灞傜殑鏃跺��*/
            $(".placeholder").on("click",function(){
                /*閬僵灞傞殣钘�*/
                $(".placeholder").hide();
                /*杞挱鍥鹃殣钘�*/
                $(".carousel_img").hide();
            });


        });
    }
    /*优惠券标题*/
    function titleDis(couponid){
        if(couponid==0){
            $('.header').find("h1").text('肯德基优惠券');
            $('#ctl00_Menu a').eq(2).text('肯德基优惠券');
        }else if(couponid==1){
            $('.header').find("h1").text('必胜客优惠券');
            $('#ctl00_Menu a').eq(2).text('必胜客优惠券');
        }else if(couponid==2){
            $('.header').find("h1").text('棒约翰优惠券');
            $('#ctl00_Menu a').eq(2).text('棒约翰优惠券');
        }else if(couponid==3){
            $('.header').find("h1").text('哈根达斯优惠券');
            $('#ctl00_Menu a').eq(2).text('哈根达斯优惠券');
        };
    }

});
