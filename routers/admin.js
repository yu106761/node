var express = require('express');
var router = express.Router();
var User = require('../models/User'); //用户
var Category = require('../models/Category'); //分类
var Content = require('../models/Content'); //内容
router.use(function (req, res, next) {
    //如果当前用户是非管理员
    if (!req.userInfo.isAdmin) {
        res.send('只有管理员才能操作')
        return;
    }
    next();
});
/** 
 *管理首页
 * ******************************************************************************************************************************************/
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});
/** 
 * 用户管理----列表
 * 
 * ********************************************************************************************************************************************/
router.get('/user', function (req, res) {
    //从数据库中读取所有的用户信息
    //limit(number) 限制获取数据
    //countDocuments 数据库总条数
    var page = Number(req.query.page || 1);
    var limit = 10;

    User.countDocuments().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1 
        page = Math.max(page, 1)
        var skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                pages: pages,
                page: page,
                limit: limit,
            })
        })
    })
});
/**
 * 分类管理---列表
 * *******************************************************************************************************************************************/
router.get('/category', function (req, res) {
    /**
     * sort 排序
     * 1 升序
     * -1降序
     */
    Category.find().sort({
        _id: -1
    }).then(function (categoryies) {
        res.render('admin/category_index', {
            userInfo: req.userInfo,
            categoryies: categoryies,
        })
    })
});
/** 
 * 
 * 分类管理---添加
 * ********************************************************************************************************************************************/
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo,
    })
})
/** 
 * 
 * 分类管理---添加保存
 * ********************************************************************************************************************************************/
router.post('/category/add', function (req, res) {
    var name = req.body.name || '';
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空',
        })
    }
    //数据库中是否已重名
    Category.findOne({
        name: name
    }).then(function (rs) {
        //如果存在
        if (rs) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在',
            })
            return process.on('unhandledRejection', error => {
                console.error('unhandledRejection', error);
                process.exit(1) // To exit with a 'failure' code
            });
        } else {
            //不存在，可以保存
            return new Category({
                name: name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        })
    })
})
/** 
 *   
 *分类管理---修改
 ********************************************************************************************************************************************/
router.get('/category/edit', function (req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return process.on('unhandledRejection', error => {
                console.error('unhandledRejection', error);
                process.exit(1) // To exit with a 'failure' code
            });
        } else {
            res.render('admin/category_edit', {
                userInfo: req.userInfo,
                category: category
            });
        }
    })
});
/** 
 *分类管理---修改保存
 ********************************************************************************************************************************************/
router.post('/category/edit', function (req, res) {

    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';

    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return process.on('unhandledRejection', error => {
                console.error('unhandledRejection', error);
                process.exit(1) // To exit with a 'failure' code
            });
        } else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return process.on('unhandledRejection', error => {
                    console.error('unhandledRejection', error);
                    process.exit(1) // To exit with a 'failure' code
                });
            } else {
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id: {
                        $ne: id
                    },
                    name: name
                });
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            });
            return process.on('unhandledRejection', error => {
                console.error('unhandledRejection', error);
                process.exit(1) // To exit with a 'failure' code
            });
        } else {
            return Category.updateOne({
                _id: id
            }, {
                name: name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
        return;
    })

});
/** 
 *   
 *分类管理---删除
 ********************************************************************************************************************************************/
router.get('/category/delete', function (req, res) {
    //获取要删除的id
    var id = req.query.id || '';
    Category.deleteOne({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    })
})
/** 
 *   
 *内容管理---列表
 ********************************************************************************************************************************************/
router.get('/content', function (req, res) {
    /**
     * sort 排序
     * 1 升序
     * -1降序
     */
    Content.find().sort({
        addTime: -1
    }).populate(['category', 'user']).then(function (contents) {
        res.render('admin/content_index', {
            userInfo: req.userInfo,
            contents: contents,
        })
    })
})
/**
 * 
 * 内容管理---添加
 *******************************************************************************************************************************************/
router.get('/content/add', function (req, res) {

    // 读取分类标题
    Category.find().sort({
        _id: -1
    }).then(function (categoryies) {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categoryies: categoryies
        })
    })

})
/**
 * 
 * 内容管理---列表保存
 *******************************************************************************************************************************************/
router.post('/content/add', function (req, res) {
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '标题不能为空'
        })
        return;
    }
    
    // 保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id,
        description: req.body.description,
        content: req.body.content,
    }).save().then(function (rs) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })
})
/**
 * 内容管理---修改
 ***********************************************************************************************************************************************/
router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';
    var categories = [];
    Category.find().sort({
        _id: 1
    }).then(function (rs) {
        categories = rs;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then(function (content) {
        if (!content) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return process.on('unhandledRejection', error => {
                console.error('unhandledRejection', error);
                process.exit(1) // To exit with a 'failure' code
            });
        } else {
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                categories: categories,
                content: content
            })
        }
    });

});
/**
 * 内容管理---修改保存
 ***********************************************************************************************************************************************/
router.post('/content/edit', function (req, res) {
    var id = req.query.id || '';
    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        })
        return;
    }
    Content.updateOne({
        _id: id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content/edit?id=' + id
        })
    });
});
/**
 * 内容管理---删除
 ***********************************************************************************************************************************************/
router.get('/content/delete', function (req, res) {
    var id = req.query.id || '';

    Content.deleteOne({
        _id: id
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        });
    });
});
module.exports = router;