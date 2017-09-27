'use strict';

const Koa         = require('koa'),
	  send          = require('koa-send'),
	  router        = require('koa-router')(),
	  serve         = require('koa-static'),
	  bodyParser    = require('koa-bodyparser'),
	  rp 	          = require('request-promise'),
    _             = require('lodash');

const app = new Koa();
const port = 4000;

// server x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('X-Response-Time', `${ms}ms`);
});

app.use(serve(__dirname + '/src'));

// app.use(passport.initialize()); // сначала passport

// const jwtsecret = "mysecretkey"; // ключ для подписи JWT
// const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
// const socketioJwt = require('socketio-jwt'); // аутентификация по JWT для socket.io

app.use(router.routes());

router.use(bodyParser());

router.post('/api/search', (async (ctx, next) => {
    
    let that = this;
    let weather;
  	let city =  ctx.request.body.city;

	  const apiKey = '79db9599e21f6fa00d36539b86173cd3';
    
    var options = {
      
    uri: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=7b359dd1309d346d33a02be668584fd3`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
};
 
 ctx.response.body = await rp(options)
    .then(function(city) {
   return city.list;
})
    .catch(function (err) {
        throw(err);
    });
   console.log(ctx.response.body);
   
}));

app.use(function* index() {
  yield send(this, __dirname + '/index.html');
});

app.listen(port, () => {
	console.log(`listening on port : ${port}`);
});