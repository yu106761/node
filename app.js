var express = require('express');
var app = express();
var mongoose = require('mongoose'); //引入mongoose
var bodyParser = require('body-parser'); //引入 body-parser
var cookies = require('cookies');
var User = require('./models/User');
var ejs = require('ejs'); //引入的ejs插件
var engine = require('ejs-mate');
//body-parser设置
app.use(bodyParser.urlencoded({
    extended: true
}));
//cookies设置
app.use(function (req, res, next) {
    req.cookies = new cookies(req, res);
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //获取当前用户是否为管理员
            User.findById(req.userInfo._id).then(function(userInfo){
                req.userInfo.isAdmin =Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        } 
    }else{
        next();
    }
})

app.set('views', './views');
app.engine('html', ejs.__express); //设置html引擎
app.engine('ejs',engine);
app.set('view engine', 'html'); //设置视图引擎

app.use('/public', express.static(__dirname + '/public')); //静态文件
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//数据库
mongoose.connect('mongodb://localhost:27018/blog', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('数据库连接失败！！！');
    } else {
        console.log('数据库连接成功！！！');
        app.listen(3000);
    }
})