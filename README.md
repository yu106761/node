# node+mongdb搭建博客
<h4>这是一个开源的个人博客系统。</h4>
<p>个人纯碎为了练习nodejs而做出来的一个博客，从项目搭建开始我会用Express 应用程序生成器来搭建</p>
<h4>技术选型：</h4>
<ul>
  <li>前端使用： &nbsp;ejs模板</li>
  <li>后端使用：&nbsp;node.js</li>
  <li>数据库选择使用： &nbsp;MongoDB</li>
</ul>
<h4>功能</h4>
<ul>
	<li>
	<h5>登入,注册功能</h5>
	</li>
  	<li>
	<h5>用户管理功能</h5>
	<ul>
  	     <li>用户列表</li>
	</ul>
 	</li>
 	<li>
	<h5>分类管理功能</h5>
	<ul>
  	     <li>分类列表
		 <ul>
  	           <li>修改分类</li>
	           <li>删除分类</li>
	         </ul>
	     </li>
	     <li>添加分类</li>
	</ul>
  	</li>
  	<li>
	<h5>内容管理功能</h5>
	<ul>
  	     <li>内容列表
		 <ul>
  	           <li>修改内容</li>
	           <li>删除内容</li>
	         </ul>
	     </li>
	     <li>添加内容</li>
	</ul>
  	</li>
  	<li>
	<h5>评论功能</h5>
	</li>
</ul>
<h4>目录结构</h4>
<ul>
 	<li>data——————数据库文件夹</li>
  	<li> models——————封装了对数据库的接口
		<ul>
			<li>Category----封装了对分类操作的接口</li>
			<li>Centent----封装了对内容操作的接口</li>
			<li>User----封装了对用户操作的接口</li>
		</ul>
	</li> 
	<li>node_modules——————项目依赖包</li>
  	<li>public——————静态资源目录
		<ul>
			<li>css</li>
			<li>js</li>
			<li>image</li>
		</ul>
	</li> 
	<li>routers——————路由目录
		<ul>
			<li>admin.js----后台逻辑</li>
			<li>api.js----登入注册逻辑</li>
			<li>main.js----前台逻辑</li>
		</ul>
	</li>
  	<li>schemas——————封装了对数据库的表结构
		<ul>
			<li>Category----封装了对分类表结构</li>
			<li>Centent----封装了对内容表结构</li>
			<li>User----封装了对用户表结构</li>
		</ul>
	</li> 
	<li>views——————模板目录</li>
		<ul>
			<li>admin----后台模板</li>
			<li>main----前台模板</li>
		</ul>
  	<li> app.js——————入口文件</li>
	<li> package.json——————文件依赖包</li>
  	<li> package-lock.json——————文件依赖包</li>
</ul>
<h1>用Express搭建项目</h1>
	<h5>1.安装node.js<h5>
		<pre>
		去nodejs官网下载最新版本就行，网址：http://nodejs.cn/download/ ,点击自己适用的系统，自动下载跟电脑操作系统位数符合的安装包，下载下来安装包之后一路next就行，nodejs安装路径不一定要使用默认的
		node -v 查看是否安装成功
		</pre>
	<h5>2.安装npm<h5>
		<pre>
		npm install npm -g
		npm -v 查看是否安装成功
		</pre>
	<h5>项目初始化---Express 应用程序生成器（这次我用Express）<h5>
		<pre>
		初始化项目
		npm init
		命令创建了一个名称为 myapp 的 Express 应用。此应用将在当前目录下的 myapp 目录中创建，并且设置为使用 ejs 模板引擎
		express --view=ejs myapp
		然后安装所有依赖包：
		cd myapp
		npm install
		通过如下命令启动此应用
		npm start
		然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。
		通过 Express 应用生成器创建应用只是众多方法中的一种。你可以不使用它，也可以修改它让它符合你的需求
		</pre>
		<pre>
			├── app.js
			├── bin
			│   └── www
			├── package.json
			├── public
			│   ├── images
			│   ├── javascripts
			│   └── stylesheets
			│       └── style.css
			├── routes
			│   ├── index.js
			│   └── users.js
			└── views
    			├── error.ejs
    			├── index.ejs
    			└── layout.ejs
		</pre>
	<h5>设置index.ejs模板为index.html还有设置public<h5>
		<pre>
			app.set('views', path.join(__dirname, 'views'));
			// app.set('view engine', 'ejs');
			var ejs = require('ejs');  //引入的ejs插件
			app.engine('html', ejs.__express);//设置html引擎
			app.set('view engine', 'html');//设置视图引擎
			app.use('/public', express.static(__dirname + '/public')); //静态文件
		</pre>
	<h5>安装mongoose<h5>
		<pre>
			npm install mongoose
		</pre>
	<h5>安装mongoose之后引入数据库,以及启动<h5>
		<p>以下代码在app.js输入</p>
		<pre>
		var mongoose = require('mongoose'); 
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
		</pre>
		<p>在命令行里输入 mongod --dbpath=""(数据库存放的地方，我这里是F:\node\node_blog\myapp\db) --port="1314"(端口号)</p>
		<p>可视化工具 Robo 3T 地址 https://robomongo.org/ </p>
	<h4>注册<h4>
		<h5>安装body-parser，作用：解析中间件解析 post get 请求---body-parser设置(app.js)<h5>
			<pre>
				npm install body-parser
				app.use(bodyParser.urlencoded({extended: true}));
			</pre>
		<h5>在models文件夹下创建user.js---封装接口</h5>
			<pre>
				var mongoose = require('mongoose');
				var userSchema = require('../schemas/user');
				module.exports=mongoose.model('user',userSchema);
			</pre>
		<p>在schemas文件夹下创建user.js---定义用户表结构</p>
			<pre>
				var mongoose = require('mongoose');
				//用户表结构
				module.exports =  new  mongoose.Schema({
    					//用户名
    					username:String,
    					//密码
    					password:String,
    					//是否为管理员用户
    					isAdmin:{
        					type:Boolean,
        					default:false
    						}
				})
			</pre>
			<p>在api.js里写注册逻辑（api.js记得引入保存用户的数据库）</p>
			<h5>Ajax请求<h5>
			<pre>
			$('#registered').on('click', function () {
        			$.ajax({
            				type: 'post',
            				url: '/api/user/register',
            				data: {
                				username: $(".register-wrap").find("[name='username']").val(),
                				password: $(".register-wrap").find("[name='password']").val(),
                				repassword: $(".register-wrap").find("[name='repassword']").val(),
            				},
            				dataType: 'json',
            				success: function (result) {
                				$(".register-wrap").find('.colWarning').html(result.message); //注册确定信息
                				// if (!result.code) {} 
            					}
        				})
    				})
			</pre>
			<h5>登陆<h5>
				<pre>
				//引入cookies
					npm install cookies
				//app.js 设置
					var cookies = require('cookies');
					app.use(function (req, res, next) {
						  req.cookies = new cookies(req, res);
						  req.userInfo = {};
						  if (req.cookies.get('userInfo')) {
						    try {
						      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
						      //获取当前用户是否为管理员
						      User.findById(req.userInfo._id).then(function (userInfo) {
							req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
							next();
						      })
						    } catch (e) {
						      next();
						    }
						  } else {
						    next();
						  }
						})
				// 登陆ajax请求
					$("#login").on("click", function () {
					    $.ajax({
						type: 'post',
						url: '/api/user/login',
						data: {
						    username: $(".login-wrap").find("[name='username']").val(),
						    password: $(".login-wrap").find("[name='password']").val(),
						},
						dataType: 'json',
						success: function (result) {
						    $(".login-wrap").find('.colWarning').html(result.message); //登入确定信息
						    if (!result.code) {
							$(".login-wrap").hide();
							$(".login-success").show();
							setTimeout(function () {
							    window.location.reload(); //刷新页面
							}, 1000);
						    }
						}
					    })
					})
				//登陆逻辑在api.js里
				</pre>
				<h5>退出<h5>
					<pre>
					//退出
					//ajaxget请求
					$('.login_del').on('click', function () {
					    $.ajax({
						url: 'api/user/logout',
						success: function (result) {
						    if (!result.code) {
							window.location.reload(); //刷新页面
						    }   
						}
					    })
					});
					//api.js退出逻辑
					router.get("/user/logout", function (req, res, next) {
					    req.cookies.set('userInfo', null);
					    res.json(responseData);
					})
					//
					//页面显示已登陆还是未登陆可以用ejs模板语句if判断来设定
					//if(!userInfo._id)判断当前是否有用户id来显示
					//
				</pre>
				
