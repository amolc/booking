/*
 * Serve content over a socket
 */

var util = require('util'),
twitter = require('twitter');
tweetdata ="" ;
tweetuser ="" ;
var tweetdataA = [];

var twitterClient = new twitter({
consumer_key: 'QdtD2PzS3LgqP07Gbd8kBQ',
consumer_secret: 'vgwHcbSF1iSPMarz3YCsiP1bRg0bfnVKXPNeOPgEW8',
access_token_key: '80256651-Bvh9GAHsZVY0DAf32fJ3KZgUUWG04aHfPeFF9RHKk',
access_token_secret: '0Uge4imZycKQBUaWMKPLu8JdZ304fvp1Oba1cxW6bG41c'
});


module.exports = function (socket) {
	
   twitterClient.stream('statuses/filter', { track: ['$msft', '$intc', '$hpq', '$goog', '$nok', '$nvda', '$bac', '$orcl', '$csco', '$aapl', '$ntap', '$emc', '$t', '$ibm', '$vz', '$xom', '$cvx', '$ge', '$ko', '$jnj'] }, function(stream) {
		  stream.on('data', function (data) {
			 // res.jsonp(data);
		
			  tweetdata = data.text ;
			  tweetdata = tweetdata;
			  tweetdataA.push(tweetdata);
			  console.log(tweetdataA);
		  });
		  
   });
	
  socket.emit('send:name', {
    name: 'Bob'
  });
  
  socket.emit('send:lastname', {
	    lastname: 'Christsocket'
	  });
  socket.emit('send:tweetuser', {
	    tweetuser: tweetuser
	  });
  socket.emit('send:tweets', {
	    tweets: tweetdataA
	  });
  
  setInterval(function () {
	  socket.emit('send:tweetuser', {
		    tweetuser: tweetuser
		  });
	socket.emit('send:tweets', {
		    tweets: tweetdataA
		  });
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 5000000);
};
