import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as fs from "fs";
import * as path from "path";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";

function configApp(app) {
    app.use(logger('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'})
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cookieParser("SECRET_GOES_HERE"));
    app.use(methodOverride());
    app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });
    app.use(errorHandler());
}

const PORT = 3000;
const app : express.Express = express();
configApp(app);

app.get('/', function (req: express.Request, res: express.Response) {
    res.json({hello:'world'});
});

app.listen(PORT, function () {
    const msg = `active-directory-rest active on port ${PORT}`;
    console.log(msg)
});
