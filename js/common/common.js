/**
 * Created by Administrator on 2017/2/26.
 */
define(['jquery'],function($){
    /*ajax loading*/
    $(document).ajaxStart(function(){
        $('.overlay').show();
    });
    $(document).ajaxStop(function(){
        $('.overlay').hide();
    });
});