var map = require('map-stream');
var special = require('special-html');

module.exports = function(){
  'use strict';

  return map(function(file,callback){
  	file.contents = new Buffer(special(String(file.contents)))
  	callback(null,file)
  });

};
