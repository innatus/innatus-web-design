var special = require('../');
var should = require('should');
require('mocha');

describe('gulp-special-html', function() {
	it('should convert special characters', function(done) {
		var stream = special("test.js");
		var fakeFile = {
      path: "/home/test/file.js",
      shortened: "file.js",
      contents: new Buffer("äüö")
    };


    stream.on('data', function(newFile){
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.shortened);
      should.exist(newFile.contents);
      newFile.path.should.equal("/home/test/file.js");
      newFile.shortened.should.equal("file.js");
      String(newFile.contents).should.equal("&#228;&#252;&#246;");
      done();
    });


    stream.write(fakeFile);
		stream.end();

	});
});