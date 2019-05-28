import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import uuid from 'uuid';
import session from 'express-session';
import { connectDb, models } from './models';
import { checkAndClearCookie, errorHandler, auth } from './middlewares';
import routes from './routes';

const FileStore = require('session-file-store')(session);
const express = require('express');

const app = express();
app.disable('x-powered-by');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3001);
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  store: new FileStore(),
  resave: false,
  saveUninitialized: true,
}));
app.use(checkAndClearCookie);
// app.use(auth);
app.use('/', routes);
// app.use(errorHandler);

connectDb().then(async () => {
  app.listen(app.get('port'), () => {
    console.log('listen on port', app.get('port'));
  });
});
