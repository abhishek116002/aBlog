var exports = module.exports ={}
exports.error = function (res) {
  var response = res;
  return function(err,result){
    if(err)
        response.send('some error');
    else
        response.send(result);
  }
};
