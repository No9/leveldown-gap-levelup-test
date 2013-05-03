var test = require('tape')
  , leveldowngap = require('leveldown-gap')
  , levelup = require('levelup')
  , factory = function (location) { return new leveldowngap(location) }
  , db = levelup('/does/not/matter', { db: factory })
  

    db.put('dob', '16 February 1941')

    window.localStorage.clear();

    db.readStream()
      .on('data', function (data) {
        test('Test Integration', function (t) {
          if(typeof data.value !== 'undefined'){
            t.ok(data.key == 'dob', "Key OK")
            t.ok(data.value == '16 February 1941', "value OK")
            t.end();
          }
        })
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
  
