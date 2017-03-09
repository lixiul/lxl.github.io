/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','artTemplate','angularjs','common'],function($,artTemplate,angularjs,undefined){
    $.get('http://139.199.157.195:9090/api/getbrandtitle',function(data){
        $('#top_list').html(artTemplate('tops_list_tpl',{list: data.result}))
    })
});