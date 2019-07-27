import createError from 'http-errors';
import express, { Request, Response } from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import { createServer } from "http";

import { APIRouter } from "./routes/api";
import { FeatsRouter } from "./routes/feats";


var app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/feats', FeatsRouter);
app.use('/api', APIRouter);
app.use('/', express.static(path.join(__dirname, '../public')));

app.use((err:any, req:Request, res:Response, next:any) => {
   console.error(err.stack)
   res.status(500).send('Something broke!');
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
