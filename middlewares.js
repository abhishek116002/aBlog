

//authentication middleware
exports.obj = {};
exports.filter = function(req,res,next){
	if(req.params.num > 1)
	{
		next("error");
	}
	else
		res.send("inauthorized access");
}
//logs the no of times this url is visited
exports.log = function(req,res,next){
	var url = req.url;
	if((exports.obj.url === undefined)||(exports.obj.url === null))
	exports.obj.url = 1;
	else
	exports.obj.url++;
	next();
}