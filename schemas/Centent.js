var mongoose = require('mongoose');
var date = new Date()
var minutesTime = date.getMinutes(); //分
var hoursTime = date.getHours(); //时
var dateTime = date.getDate(); //天
var monthTime = date.getMonth() + 1; //月
var fullYearTime = date.getFullYear(); //年
var addTime = fullYearTime + "年" + monthTime + "月" + dateTime + '日 ' + hoursTime + ":" + minutesTime;
//内容表结构
module.exports = new mongoose.Schema({
    /*****************************************************
     * 关联字段 ----内容分类ID
     *************************/
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },
    /********************************************************
     * 关联字段 ----作者（用户）ID
     *********************************/
    user:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    /*******************************************************
     * 添加时间
     *********/
    addtime: {
        type: String,
        default: addTime
    },
    /********************************************************
     * 点赞
     *********/
    favor: {
        type: Number,
        default: 0
    },
    /********************************************************
     * 内容标题
     *********/
    title: String,
    /********************************************************
     * 简介
     ********/
    description: {
        //类型
        type: String,
        //引用
        default: ''
    },
    /********************************************************
     * 内容
     *******/
    content: {
        //类型
        type: String,
        //引用
        default: ''
    },
    //评论
    comments: {
        type: Array,
        default: []
    }

})