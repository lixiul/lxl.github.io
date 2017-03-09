/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery', 'artTemplate','angularjs','common'], function ($, template,angularjs,undefined) {
    /*获取分类的标题信息*/
    var titleID;
    $.get('http://mmb.ittun.com/api/getcategorytitle', function (data) {
        var html = template('categoryBox', {result: data.result});
        $('#accordion').html(html);
        /*获取id*/

        $('.panel-heading').on('click',function(){
            titleID = $(this).attr('id');
            getdata();
        });
    });
    function getdata(){
        /*传id进去 获取分类列表的信息，*/
        $.get('http://mmb.ittun.com/api/getcategory', {titleid: titleID}, function (data) {
            var html = template('categoryListTpl', {result: data.result});
            $('.panel-body .row').html(html);
        });
    }
});





