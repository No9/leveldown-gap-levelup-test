var leveldowngap = require('leveldown-gap')
  , levelup = require('levelup')
  , factory = function (location) { return new leveldowngap(location) }
  , db = levelup('/does/not/matter', { db: factory })

window.localStorage.clear();
	
db.put('dob', '16 February 1941')
db.put('spouse', 'Kim Young-sook')
db.put('occupation', 'Clown')

window.localStorage.clear();

db.readStream()
  .on('data', function (data) {
  	if(typeof data.value !== 'undefined') 
    console.log(data.key, '=', data.value)
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream ended')
  })
  
  if(!Error.captureStackTrace){
  	Error.prototype.captureStackTrace = function(info, callee){
  		console.log(info)
  		console.log(callee)
  	}
  }