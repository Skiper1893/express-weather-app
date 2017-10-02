'use strict';

const Koa         = require('koa'),
	  send          = require('koa-send'),
	  router        = require('koa-router')(),
	  serve         = require('koa-static'),
	  bodyParser    = require('koa-bodyparser'),
	  rp 	          = require('request-promise'),
    _             = require('lodash'),
    passport = require('koa-passport'), //реализация passport для Koa
    LocalStrategy = require('passport-local'), //локальная стратегия авторизации
    JwtStrategy = require('passport-jwt').Strategy, // авторизация через JWT
    ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT


const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwt = require('jsonwebtoken'); // аутентификация  по JWT для hhtp
const socketioJwt = require('socketio-jwt'); // аутентификация  по JWT для socket.io

const socketIO = require('socket.io');

const mongoose = require('mongoose'); // стандартная прослойка для работы с MongoDB
const crypto = require('crypto'); // модуль node.js для выполнения различных шифровальных операций, в т.ч. для создания хэшей.
const app = new Koa();
const port = 4000;

// server x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('X-Response-Time', `${ms}ms`);
});

app.use(passport.initialize()); // сначала passport
app.use(serve(__dirname + '/src'));
router.use(bodyParser());
app.use(router.routes());
const server = app.listen(port);


mongoose.Promise = Promise; // Просим Mongoose использовать стандартные Промисы
mongoose.set('debug', true);  // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода
mongoose.connect('mongodb://localhost/auth_weather-app'); // Подключаемся к базе test на локальной машине. Если базы нет, она будет создана автоматически.
mongoose.connection.on('error', console.error);

//---------Схема и модель пользователя------------------//

const userSchema = new mongoose.Schema({
  displayName: String,
  email: {
    type: String,
    required: 'Укажите e-mail',
    unique: 'Такой e-mail уже существует'
  },
  passwordHash: String,
  salt: String,
}, {
  timestamps: true
});

userSchema.virtual('password')
.set(function (password) {
  this._plainPassword = password;
  if (password) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
})

.get(function () {
  return this._plainPassword;
});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

const User = mongoose.model('User', userSchema);

//----------Passport Local Strategy--------------//

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      
      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
      }
      return done(null, user);
    });
  }
  )
);

//----------Passport JWT Strategy--------//

// Ждем JWT в Header

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
);

//------------Routing---------------//

//маршрут для создания нового пользователя

router.post('/user', async(ctx, next) => {
  try {
    ctx.body = await User.create(ctx.request.body);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

//маршрут для локальной авторизации и создания JWT при успешной авторизации

router.post('/login', async(ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      //--payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      };
      const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
      
      ctx.body = {user: user.displayName, token: 'JWT ' + token};
    }
  })(ctx, next);
  
});

// маршрут для авторизации по токену

router.get('/custom', async(ctx, next) => {
  
  await passport.authenticate('jwt', function (err, user) {
    if (user) {
      ctx.body = "hello " + user.displayName;
    } else {
      ctx.body = "No such user";
      console.log("err", err)
    }
  } )(ctx, next)
  
});

//---Socket Communication-----//

let io = socketIO(server);

io.on('connection', socketioJwt.authorize({
  secret: jwtsecret,
  timeout: 15000
})).on('authenticated', function (socket) {
  
  console.log('Это мое имя из токена: ' + socket.decoded_token.displayName);
  
  socket.on("clientEvent", (data) => {
    console.log(data);
  })
});

//---Get weather API promise-----//

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

