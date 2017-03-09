/**
 * Created by Administrator on 2017/3/1.
 */
define(['artTemplate'],function(template){
    var util = {
        getQueryString:function(key) {
            // 去掉字符串首字母?号
            var search = location.search.slice(1);
            //name=xx&age1=8&age=18

            // 使用&符号得到每一个key=val
            var searchArr = search.split('&');
            // ['name=xx','age1=8']
            var tempArr = null;
            var searchObj = {};

            // 遍历数组中的每一个key=val字符串，使用=号劈开，
            // 然后以key为名，val为值添加到searchObj对象中。
            for( var i =0, len = searchArr.length; i < len; i++) {
                tempArr = searchArr[i].split('=');
                //					['name','xx']
                searchObj[ tempArr[0] ] = tempArr[1];
            }

            // 有参数返回指定值，没有参数返回全部值
            return arguments.length? searchObj[key]: searchObj;
            //return searchObj;
        },
        extend:function(){

        },
        /*设置localStorage&过期时间*/
        setStorage:function(key,value){
            var curTime = new Date().getTime();
            localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
        },
        /*获取localStorage&过期时间*/
        getStorage:function(key,exp){
            var data = localStorage.getItem(key);
            var dataObj = JSON.parse(data);
            var dataObjDatatoJson = dataObj.data;
            if (dataObjDatatoJson && new Date().getTime() - dataObj.time>exp) {
                return false;
            }else{
                return dataObjDatatoJson;
            }
        },
        /*截取字符串中数字的方法*/
        getNum:function(str){
            if (!str || str.length == 0) {
                return "";
            } else {
                var ret = /\d+/.exec(str);
                if (!ret) {
                    return "";
                }
                return parseInt(/\d+/.exec(str)[0]);
            }
        },
        commonInit:function(){
            template.helper("getNum", this.getNum);
        }
    };
    util.commonInit();
    return util;

});