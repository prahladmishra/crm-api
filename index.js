import bodyParser from "body-parser";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 4000;

// Helmet header protection
app.use(helmet());

//rate limit setup to prevent DoS
const limiter = new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100 // limit of number of request per IP
});

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(':')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(':')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

//Static file serving
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send(`Node and Express server running on port ${ PORT }`)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${ PORT }`)
});