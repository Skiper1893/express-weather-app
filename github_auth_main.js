module.exports = function() {

import  './github_auth';

const publicRouter = new Router();

//Configure /auth/github & /auth/github/callback
publicRouter.get('/auth/github', passport.authenticate('github', {scope: ['user','repo']}));
publicRouter.get('/auth/github/callback',
  passport.authenticate('github', {successRedirect:'/', failureRedirect: '/'})
);

app.use(publicRouter.middleware());

//Secures routes
const securedRouter = new Router();

//Middleware: authed
function *authed(next){
  if (this.req.isAuthenticated()){
    yield next;
  } else {
    this.redirect('/auth/github');
  }
}

securedRouter.get('/app', authed, function *(){
  this.body = 'Secured Zone: koa-tutorial\n' + JSON.stringify(this.req.user, null, '\t');
});

app.use(securedRouter.middleware());

app.use(passport.initialize());
app.use(serve(__dirname + '/src'));
router.use(bodyParser());
app.use(router.routes());
const server = app.listen(port, () => console.log(`app listen on ${port}`));

mongoose.Promise = Promise; // Просим Mongoose использовать стандартные Промисы
mongoose.set('debug', true);  // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода
mongoose.connect('mongodb://localhost/auth_weather-app'); // Подключаемся к базе на локальной машине. Если базы нет, она будет создана автоматически.
mongoose.connection.on('error', console.error);
}