var express = require('express');
var router = express.Router();
var User = require('../models/User'); //引入数据库
var Content = require('../models/Content')
//统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: '',
    };
    next();
});
//注册逻辑
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    //用户名不能为空
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能 为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    // 两次密码一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '密码不一致';
        res.json(responseData);
        return;
    }
    //查看数据库 用户是否被注册
    User.findOne({
        username: username
    }).then(function (userInfo) {
        if (userInfo) {
            //表示数据库中已有该数据
            responseData.code = 4;
            responseData.message = '该用户已被注册';
            res.json(responseData);
            return;
        }
        //保存用户注册信息到数据库
        var user = new User({
            username: username,
            password: password,
        })
        return user.save();
    }).then(function (newUserInfo) {
        responseData.message = '注册成功';
        res.json(responseData);
        return;
    })

});

//登入逻辑
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == '' || password == '') {
        responseData.code = 0;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    //查看数据库中用户密码是否一致,如果存在登入成功
    User.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.code = 1;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        };
        responseData.message = '登入成功';
        //
        responseData.userInfo = {
            username: userInfo.username,
            _id: userInfo._id
        };
        //
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
        return;
    })
})
/**
 *退出
 */
router.get("/user/logout", function (req, res, next) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
})

/**
 * 获取所有文章评论
 */
router.get('/comment', function (req, res) {
    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function (content) {
        responseData.data = content.comments;
        res.json(responseData);
    })
});

/**
 * 评论提交
 */
router.post('/comment/post', function (req, res) {
    //内容的id
    var contentId = req.body.contentid || '';
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        contents: req.body.contents
    };

    //查询当前这篇内容的信息
    Content.findOne({
        _id: contentId
    }).then(function (contents) {
        contents.comments.push(postData);
        return contents.save();
    }).then(function (newContent) {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    });
});
module.exports = router;