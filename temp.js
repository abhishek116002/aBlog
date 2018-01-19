var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var Blog = require('./blogModel');
var middlewares = require('./middlewares');
var modules = require('./modules');
var app = express();
app.use(bodyParser.json({limit:'10mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));
db = mongoose.connect("mongodb://localhost/myblogapp");
mongoose.connection.on('connected',function(){
	console.log("db open");
});

var errorHandler = function(err, req, res,next){
	if(err)
		console.log("error");
}
//routers
app.use(errorHandler);

app.get('/:num',middlewares.log,middlewares.filter,function(req,res,next){ 
	res.send("this is debugging");
});

app.post('/blog/create',middlewares.log,function(req,res,next){
	var newBlog = new Blog({
		title    : req.body.title,
		subTitle : req.body.subTitle,
		blogBody : req.body.blogBody                                                                       ////cannot put error function inside module
	});
	newBlog.tags = ((req.body.tags != undefined)&&(req.body.tags != null))?req.body.tags.split(','):' ';
	newBlog.created = Date.now();
	newBlog.authorInfo = req.body.authorInfo;
	newBlog.save(modules.error(res));
});

app.get('/blogs/all',middlewares.log,function(req,res,next){																	//////blogs gets confused for num
	Blog.find({},modules.error(res));
});

app.get('/blog/:id',middlewares.log,function(req,res,next){
	Blog.findOne({'_id':req.params.id},modules.error(res));
});

app.put('/blog/:id/:num/edit',middlewares.log,middlewares.filter,function(req,res,next){
	var update = req.body;
	Blog.findOneAndUpdate({'_id':req.params.id}, update,modules.error(res));
});

app.post('/blogs/:id/:num/delete',middlewares.log,middlewares.filter,function(req, res, next) {
	Blog.remove({'_id':req.params.id},modules.error(res));
});

app.listen(3000,function(){
	console.log("open..");
});
