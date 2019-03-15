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
	<h5>安装mongoose之后引入数据库<h5>
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
		<p>下载Robo 3T 地址 https://robomongo.org/ </p>
		
