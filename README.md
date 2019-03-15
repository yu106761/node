# node+mongdb搭建博客
<h4>这是一个开源的个人博客系统。</h4>
<p>个人纯碎为了练习nodejs而做出来的一个博客，给个Star就是我最大的动力！前期页面样式写的比较简陋，有时间我在细心写</p>
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
<h4>项目初步搭建</h4>









