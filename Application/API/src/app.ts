import createError from 'http-errors';
import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from "http";

import { IndexRouter } from "./routes/index";
import { FeatsRouter } from "./routes/feats";


var app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/feats', FeatsRouter);
app.use('/', IndexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   next(createError(404));
});

// error handler
// app.use(function(err: any, req: any, res: any, next: any) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};

//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
// });

const serv = createServer(app);
serv.listen(process.env.PORT || '8080');

module.exports = app;
