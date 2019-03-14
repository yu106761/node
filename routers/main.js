var express = require('express');
var router = express.Router();
var Category = require('../models/Category'); //分类
var Content = require('../models/Content');
var data;

/***
 * 
 */
router.use(function (req, res, next) {
   data = {
      userInfo: req.userInfo,
      categoryies: [],
   };
   Category.find().then(function (categoryies) {
      data.categoryies = categoryies;
      next();
   })
})

/**
 * 首页
 **************************************************************************************************************************************/
router.get('/', function (req, res, next) {
   data.category = req.query.category || '';
   data.countDocuments = 0;
   data.page = Number(req.query.page || 1);
   data.limit = 10;
   data.pages = 0;
   var where = {};
   if (data.category) {
      where.category = data.category;
   }
   //读取所有的分类信息
   Content.where(where).countDocuments().then(function (countDocuments) {

      data.countDocuments = countDocuments;
      //计算总页数
      data.pages = Math.ceil(data.countDocuments / data.limit);
      //取值不能超过pages
      data.page = Math.min(data.page, data.pages);
      //取值不能小于1
      data.page = Math.max(data.page, 1);

      var skip = (data.page - 1) * data.limit;

      return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
         addtime: -1
      });

   }).then(function (contents) {
      data.contents = contents;
      res.render('main/index', data);
   });
});
router.get('/view', function (req, res) {
   var contentId = req.query.contentId;
   data.category = req.query.category || '';
   if (data.category) {
      where.category = data.category;
   }
   Content.find({
      _id: contentId
   }).populate(['category', 'user']).then(function (contents) {
      data.contents = contents;
      res.render('main/view', data);
   })
})

module.exports = router;